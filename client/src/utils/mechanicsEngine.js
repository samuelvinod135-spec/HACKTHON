// Classical Mechanics & Dynamics Analytical Engine
// Provides exact physical calculations for Pendulum, Projectile, Spring, and Inclined Plane

/**
 * Pendulum state update
 */
export function updatePendulum(state, dtSec, env) {
  const g = env.gravity ?? 9.81;
  const damping = env.airResistance ? 0.05 : 0.005;
  const L = Math.max(0.2, (state.length ?? 180) / 100); // meters
  const m = state.mass ?? 1.0; // kg

  let theta = state.theta ?? 0.6; // initial angle radians
  let omega = state.omega ?? 0;   // angular velocity

  // Angular acceleration: alpha = -(g / L) * sin(theta) - damping * omega
  const alpha = -(g / L) * Math.sin(theta) - damping * omega;
  omega += alpha * dtSec;
  theta += omega * dtSec;

  // Tangential velocity and acceleration
  const velocity = omega * L;
  const accel = alpha * L;

  // Energies
  const h = L * (1 - Math.cos(theta));
  const Ep = m * g * h;
  const Ek = 0.5 * m * velocity * velocity;
  const period = 2 * Math.PI * Math.sqrt(L / g);

  return {
    theta,
    omega,
    velocity: Math.abs(velocity),
    accel: Math.abs(accel),
    Ek,
    Ep,
    period,
  };
}

/**
 * Computes ballistic projectile trajectory points
 */
export function calculateProjectileTrajectory(launcher, env, numPoints = 80) {
  const g = env.gravity ?? 9.81;
  const v0 = launcher.params?.speed ?? 25; // m/s
  const angleDeg = launcher.params?.angle ?? 45;
  const angleRad = (angleDeg * Math.PI) / 180;
  const m = launcher.params?.mass ?? 2.0;

  const vx0 = v0 * Math.cos(angleRad);
  const vy0 = v0 * Math.sin(angleRad);

  // Time of flight: t_flight = 2 * vy0 / g
  const tFlight = g > 0 ? (2 * vy0) / g : 10;
  const maxRange = vx0 * tFlight;
  const maxHeight = (vy0 * vy0) / (2 * (g || 0.01));

  // Visual scale factors (canvas meters to pixels)
  const pxPerMeter = 5.5;

  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = (i / numPoints) * tFlight;
    const x = vx0 * t;
    const y = vy0 * t - 0.5 * g * t * t;
    points.push({
      x: launcher.x + x * pxPerMeter,
      y: launcher.y - y * pxPerMeter, // Inverted Y for canvas
      t,
    });
  }

  return {
    points,
    tFlight,
    maxRange,
    maxHeight,
    vx0,
    vy0,
    EkMax: 0.5 * m * v0 * v0,
  };
}

/**
 * Spring-Mass Hooke's Law & Simple Harmonic Motion
 */
export function updateSpring(state, dtSec, env) {
  const k = state.springConstant ?? 25; // N/m
  const m = state.mass ?? 1.5;          // kg
  const damping = env.airResistance ? 0.4 : 0.05;

  let x = state.displacement ?? 40; // cm or px displacement from equilibrium
  let v = state.velocity ?? 0;

  // F = -k*x - damping*v => a = F/m
  const a = (-k * (x / 100) - damping * v) / m;
  v += a * dtSec;
  x += v * dtSec * 100;

  const Ek = 0.5 * m * v * v;
  const Ep = 0.5 * k * (x / 100) * (x / 100);
  const period = 2 * Math.PI * Math.sqrt(m / k);
  const freq = 1 / period;

  return {
    displacement: x,
    velocity: Math.abs(v),
    accel: Math.abs(a),
    Ek,
    Ep,
    period,
    freq,
  };
}

/**
 * Inclined Plane acceleration with friction
 */
export function calculateRampPhysics(ramp, env) {
  const g = env.gravity ?? 9.81;
  const angleDeg = ramp.params?.angle ?? 30;
  const angleRad = (angleDeg * Math.PI) / 180;
  const mu = ramp.params?.friction ?? 0.15; // Coefficient of friction
  const m = ramp.params?.mass ?? 2.0;

  // Net force down the incline: F_net = m*g*sin(theta) - mu*m*g*cos(theta)
  const sinA = Math.sin(angleRad);
  const cosA = Math.cos(angleRad);

  // If friction exceeds component of gravity, static equilibrium: a = 0
  let a = g * (sinA - mu * cosA);
  if (a < 0) a = 0;

  const normalForce = m * g * cosA;
  const frictionForce = mu * normalForce;
  const drivingForce = m * g * sinA;

  return {
    accel: a,
    normalForce,
    frictionForce,
    drivingForce,
    angleDeg,
  };
}
