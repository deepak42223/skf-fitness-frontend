// ═══════════════════════════════════════════════
// EXERCISE DATABASE — Ported from Powerhouse Gym
// ═══════════════════════════════════════════════

export const TEMPOS = ['3 0 2', '2 2 2', '4 1 1', '5 3 1', '1 0 1', '3 2 1', '2 1 1'];

export const SCHEMES: Record<string, { repRanges: number[]; ratio: number[]; rest: number[] }> = {
  strength_Power: {
    repRanges: [3, 8],
    ratio: [3, 2],
    rest: [120, 60],
  },
  growth_Hypertrophy: {
    repRanges: [8, 15],
    ratio: [2, 3],
    rest: [90, 60],
  },
  cardiovascular_Endurance: {
    repRanges: [12, 30],
    ratio: [2, 4],
    rest: [60, 45],
  },
};

export const WORKOUTS: Record<string, any> = {
  individual: ['biceps', 'triceps', 'back', 'shoulders', 'quads', 'hamstrings', 'glutes', 'calves', 'abs'],
  bro_split: {
    push: ['triceps', 'chest', 'shoulders'],
    pull: ['back', 'shoulders', 'biceps'],
    legs: ['glutes', 'calves', 'hamstrings', 'quads'],
  },
  bodybuilder_split: {
    chest: ['chest'],
    back: ['back'],
    shoulders: ['shoulders'],
    legs: ['glutes', 'quads', 'hamstrings', 'calves'],
    arms: ['biceps', 'triceps'],
    abs: ['abs'],
  },
  upper_lower: {
    upper: ['triceps', 'biceps', 'shoulders', 'chest', 'back'],
    lower: ['quads', 'calves', 'hamstrings', 'glutes'],
  },
};

export interface Exercise {
  type: 'compound' | 'accessory';
  meta: { environment: string; level: number[]; equipment: string[] };
  unit: 'reps' | 'duration';
  muscles: string[];
  description: string;
  substitutes: string[];
  variants?: Record<string, string>;
}

export const EXERCISES: Record<string, Exercise> = {
  // ── CHEST ──────────────────────────────────────────
  barbell_bench_press: {
    type: 'compound', meta: { environment: 'gym', level: [0,1,2], equipment: ['barbell'] },
    unit: 'reps', muscles: ['chest'],
    description: 'Ensure your scapula are retracted when performing the bench press, arms 2 palm widths wider than shoulder width. Lower the bar with your elbows flared at a 45 degree angle from your torso, touching the bar down to your chest at your nipple line.___Flat: Perform this exercise on a horizontal bench.',
    substitutes: ['pushup', 'dumbbell_bench_press', 'dumbbell_floor_press'],
  },
  dumbbell_bench_press: {
    type: 'compound', meta: { environment: 'gym', level: [0,1,2], equipment: ['dumbbell'] },
    unit: 'reps', muscles: ['chest'],
    description: 'With your scapula retracted, hold the dumbbells directly above your chest with your hands slightly wider than shoulder width apart. Lower the dumbbells, keeping elbows to a maximum 45 degree flare, until your thumbs are at nipple height.___Incline: Perform this exercise on a bench inclined to 30 degrees.',
    substitutes: ['pushup', 'barbell_bench_press'],
  },
  pushup: {
    type: 'accessory', meta: { environment: 'gymhome', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['chest'],
    description: 'In a plank position, with hands slightly further than shoulder width apart and thumbs around nipple height, slowly lower your chest to the ground keeping elbows flared to a 45 degree angle. Then press back up.___Military: Ensure your hands are in the same vertical plane as your chest and shoulders.',
    substitutes: ['dumbbell_bench_press', 'dips'],
  },
  cable_fly: {
    type: 'accessory', meta: { environment: 'gym', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['chest'],
    description: 'Using the handles and with your arms mostly straight, bring the two handles together in front of you, and then slowly release backwards.___Incline: Cable fixing low near ground, hands move from low to high.',
    substitutes: ['dumbbell_chest_fly'],
  },
  dips: {
    type: 'compound', meta: { environment: 'gymhome', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['chest', 'triceps'],
    description: 'When in the dip position, ensure you are leaning forward over your hands and slowly lower your body until your elbows are parallel with the ground. Then press back up. Keep your elbow flare to a maximum of 45 degrees.',
    substitutes: ['pushup'],
  },
  // ── BACK ───────────────────────────────────────────
  pullup: {
    type: 'compound', meta: { environment: 'gymhome', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['back'],
    description: 'Hands approximately shoulder width apart, start by retracting your scapula down and back, then pull your body up until your chin is above bar height. Then return to a dead hang.___Underhand: Perform with supinated grip, palms facing towards you.',
    substitutes: ['lat_pulldown'],
  },
  lat_pulldown: {
    type: 'compound', meta: { environment: 'gym', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['back'],
    description: 'Hands approximately shoulder width apart, retract your scapula down and back, then pull the bar down until it touches your chest. Return to a dead hang position.___Underhand: Perform with supinated grip.',
    substitutes: ['pullup'],
  },
  barbell_bentover_row: {
    type: 'compound', meta: { environment: 'gym', level: [0,1,2], equipment: ['barbell'] },
    unit: 'reps', muscles: ['back'],
    description: 'With hands slightly wider than shoulder width holding the bar, hinge at your hips until your torso is angled 45 degrees forward. Pull your elbows back behind you to complete the row.___Underhand: Supinated grip, palms facing away from feet.',
    substitutes: ['dumbbell_bentover_row', 'seated_row'],
  },
  dumbbell_bentover_row: {
    type: 'compound', meta: { environment: 'gymhome', level: [0,1,2], equipment: ['dumbbell'] },
    unit: 'reps', muscles: ['back'],
    description: 'With dumbbells either side of your body, hinge at your hips until your torso is 45 degrees forward. Pull your elbows back behind you to complete the row.___Neutral grip: Palms facing each other.',
    substitutes: ['barbell_bentover_row', 'seated_row'],
  },
  seated_row: {
    type: 'compound', meta: { environment: 'gym', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['back'],
    description: 'Sitting upright with feet on the platform, retract your scapula and pull the handle towards your lower chest/abdomen. Slowly release forward.___Wide grip: Use a wide bar attachment.',
    substitutes: ['barbell_bentover_row', 'pullup'],
  },
  straight_arm_pushdown: {
    type: 'accessory', meta: { environment: 'gym', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['back'],
    description: 'Begin with the bar at approximately eye level and arms extended, press the bar down maintaining straight arms until your hands touch your lower mid-section. Thrust hips through and release back.',
    substitutes: ['lat_pulldown'],
  },
  // ── SHOULDERS ──────────────────────────────────────
  barbell_overhead_press: {
    type: 'compound', meta: { environment: 'gym', level: [0,1,2], equipment: ['barbell'] },
    unit: 'reps', muscles: ['shoulders'],
    description: 'With bar resting on the front of your shoulders, press the barbell straight up above your head, then slowly lower back down. Keep core tight throughout.___Seated: Perform seated for additional back support.',
    substitutes: ['dumbbell_shoulder_press', 'arnold_press'],
  },
  dumbbell_shoulder_press: {
    type: 'compound', meta: { environment: 'gymhome', level: [0,1,2], equipment: ['dumbbell'] },
    unit: 'reps', muscles: ['shoulders'],
    description: 'Seated or standing with dumbbells at shoulder height, press them directly above your head until arms are fully extended. Lower back to shoulder height.___Arnold press: Rotate palms inward at the bottom.',
    substitutes: ['barbell_overhead_press', 'arnold_press'],
  },
  lateral_raise: {
    type: 'accessory', meta: { environment: 'gymhome', level: [0,1,2], equipment: ['dumbbell'] },
    unit: 'reps', muscles: ['shoulders'],
    description: 'Standing with dumbbells at your sides, raise both arms simultaneously to shoulder height, keeping a slight bend in the elbows. Lower slowly.___Cable: Use cables for constant tension throughout.',
    substitutes: ['face_pull'],
  },
  face_pull: {
    type: 'accessory', meta: { environment: 'gym', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['shoulders'],
    description: 'With cable at face height using a rope attachment, pull the rope towards your face flaring elbows out, hands ending either side of your head. Slowly release.',
    substitutes: ['lateral_raise'],
  },
  front_raise: {
    type: 'accessory', meta: { environment: 'gymhome', level: [0,1,2], equipment: ['dumbbell'] },
    unit: 'reps', muscles: ['shoulders', 'chest'],
    description: 'Standing with dumbbells in front of your thighs, raise them forward and up to shoulder height with arms mostly straight. Lower slowly.___Plate: Use a plate held with both hands.',
    substitutes: ['lateral_raise'],
  },
  arnold_press: {
    type: 'compound', meta: { environment: 'gymhome', level: [0,1,2], equipment: ['dumbbell'] },
    unit: 'reps', muscles: ['shoulders'],
    description: 'Hold dumbbells with palms facing you at chin height. As you press up, rotate your palms outward so they face forward at the top. Reverse on the way down.',
    substitutes: ['dumbbell_shoulder_press'],
  },
  // ── BICEPS ─────────────────────────────────────────
  barbell_curl: {
    type: 'compound', meta: { environment: 'gymhome', level: [0,1,2], equipment: ['barbell'] },
    unit: 'reps', muscles: ['biceps'],
    description: 'Standing with an underhand grip on the barbell at hip width, curl the bar up towards your chin, keeping elbows pinned to your sides. Lower slowly.___EZ bar: Use an EZ curl bar to reduce wrist strain.',
    substitutes: ['dumbbell_curl', 'hammer_curl'],
  },
  dumbbell_curl: {
    type: 'accessory', meta: { environment: 'gymhome', level: [0,1,2], equipment: ['dumbbell'] },
    unit: 'reps', muscles: ['biceps'],
    description: 'Standing with a dumbbell in each hand, palms facing forward, curl the dumbbells up towards your shoulders keeping elbows pinned. Lower slowly.___Incline: Perform on inclined bench for full stretch.',
    substitutes: ['barbell_curl', 'hammer_curl'],
  },
  hammer_curl: {
    type: 'accessory', meta: { environment: 'gymhome', level: [0,1,2], equipment: ['dumbbell'] },
    unit: 'reps', muscles: ['biceps'],
    description: 'With a neutral grip (palms facing each other), curl the dumbbells up towards your shoulders, keeping elbows pinned to your sides. Lower slowly.',
    substitutes: ['dumbbell_curl', 'cable_curl'],
  },
  cable_curl: {
    type: 'accessory', meta: { environment: 'gym', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['biceps'],
    description: 'Using the low cable pulley with a bar attachment, curl the bar up towards your chin keeping elbows pinned. Lower slowly.___Rope: Use rope for hammer-style curl.',
    substitutes: ['barbell_curl', 'dumbbell_curl'],
  },
  preacher_curl: {
    type: 'accessory', meta: { environment: 'gym', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['biceps'],
    description: 'Seated at a preacher bench, rest your upper arms on the pad and curl the bar or dumbbells up toward your shoulders. Lower slowly for maximum stretch.',
    substitutes: ['barbell_curl', 'cable_curl'],
  },
  // ── TRICEPS ────────────────────────────────────────
  tricep_pushdown: {
    type: 'accessory', meta: { environment: 'gym', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['triceps'],
    description: 'Standing at the cable machine with a bar or rope attachment at head height, pin your elbows to your sides and push the attachment down until your arms are fully extended. Slowly release.___Rope: Flare hands apart at the bottom.',
    substitutes: ['skull_crusher', 'overhead_tricep_extension'],
  },
  skull_crusher: {
    type: 'compound', meta: { environment: 'gymhome', level: [0,1,2], equipment: ['barbell'] },
    unit: 'reps', muscles: ['triceps'],
    description: 'Lying on a bench with a barbell or EZ bar held above your chest, lower the bar toward your forehead by bending only your elbows. Press back up.___Dumbbell: Use dumbbells for unilateral work.',
    substitutes: ['tricep_pushdown', 'overhead_tricep_extension'],
  },
  overhead_tricep_extension: {
    type: 'accessory', meta: { environment: 'gymhome', level: [0,1,2], equipment: ['dumbbell'] },
    unit: 'reps', muscles: ['triceps'],
    description: 'Standing or seated, hold a dumbbell or bar above your head with arms extended. Lower behind your head by bending your elbows, then press back up.___Cable: Use the high cable for constant tension.',
    substitutes: ['skull_crusher', 'tricep_pushdown'],
  },
  close_grip_bench_press: {
    type: 'compound', meta: { environment: 'gym', level: [0,1,2], equipment: ['barbell'] },
    unit: 'reps', muscles: ['triceps', 'chest'],
    description: 'Perform the bench press with hands placed shoulder-width or slightly narrower. Keep elbows close to your torso throughout the movement.',
    substitutes: ['skull_crusher', 'dips'],
  },
  // ── QUADS ──────────────────────────────────────────
  barbell_squat: {
    type: 'compound', meta: { environment: 'gym', level: [0,1,2], equipment: ['barbell'] },
    unit: 'reps', muscles: ['quads', 'glutes'],
    description: 'With bar resting across your upper back, feet shoulder-width apart, descend until thighs are parallel to the floor. Keep chest up, knees tracking over toes. Drive through heels to stand.___Front squat: Bar rests on front of shoulders.',
    substitutes: ['leg_press', 'dumbbell_squat'],
  },
  leg_press: {
    type: 'compound', meta: { environment: 'gym', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['quads', 'glutes'],
    description: 'Seated in the leg press machine with feet shoulder-width apart, lower the platform until your knees are at 90 degrees, then press back up. Do not lock knees at the top.___High feet: Targets glutes more.',
    substitutes: ['barbell_squat', 'hack_squat'],
  },
  leg_extension: {
    type: 'accessory', meta: { environment: 'gym', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['quads'],
    description: 'Seated in the leg extension machine with ankles under the pad, extend your legs until they are fully straight. Slowly lower back down.',
    substitutes: ['lunges', 'step_ups'],
  },
  lunges: {
    type: 'accessory', meta: { environment: 'gymhome', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['quads', 'glutes'],
    description: 'Step forward with one leg and lower your hips until both knees are at 90 degrees. Push back to the starting position and repeat on the other side.___Reverse: Step backward instead.',
    substitutes: ['leg_extension', 'step_ups'],
  },
  hack_squat: {
    type: 'compound', meta: { environment: 'gym', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['quads'],
    description: 'Positioned in the hack squat machine with shoulder pads on your shoulders, lower until thighs are parallel to the platform. Drive back up without locking knees.',
    substitutes: ['barbell_squat', 'leg_press'],
  },
  // ── HAMSTRINGS ─────────────────────────────────────
  romanian_deadlift: {
    type: 'compound', meta: { environment: 'gymhome', level: [0,1,2], equipment: ['barbell'] },
    unit: 'reps', muscles: ['hamstrings', 'glutes'],
    description: 'Holding a barbell at hip level, hinge at your hips pushing them backward, lowering the bar along your legs until you feel a deep stretch in your hamstrings. Drive hips forward to return.___Dumbbell: Use dumbbells for the same movement.',
    substitutes: ['leg_curl', 'good_morning'],
  },
  leg_curl: {
    type: 'accessory', meta: { environment: 'gym', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['hamstrings'],
    description: 'Lying or seated in the leg curl machine, curl your legs toward your glutes against resistance. Slowly lower back down.___Seated: More constant tension throughout.',
    substitutes: ['romanian_deadlift', 'nordic_curl'],
  },
  nordic_curl: {
    type: 'accessory', meta: { environment: 'gymhome', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['hamstrings'],
    description: 'Kneeling with ankles secured, slowly lower your torso toward the ground by extending at the knee while keeping hips extended. Catch yourself with hands and push back up.',
    substitutes: ['leg_curl', 'romanian_deadlift'],
  },
  good_morning: {
    type: 'accessory', meta: { environment: 'gym', level: [0,1,2], equipment: ['barbell'] },
    unit: 'reps', muscles: ['hamstrings', 'back'],
    description: 'With a bar on your upper back and knees slightly bent, hinge at the hips pushing them backward, lowering your torso until nearly parallel. Drive hips forward to return.',
    substitutes: ['romanian_deadlift'],
  },
  // ── GLUTES ─────────────────────────────────────────
  hip_thrust: {
    type: 'compound', meta: { environment: 'gymhome', level: [0,1,2], equipment: ['barbell'] },
    unit: 'reps', muscles: ['glutes', 'hamstrings'],
    description: 'Resting your upper back against a bench with a barbell across your hips, drive your hips up until they are fully extended. Squeeze glutes at the top and lower slowly.___Dumbbell: Place dumbbell on hips instead.',
    substitutes: ['romanian_deadlift', 'glute_bridge'],
  },
  glute_bridge: {
    type: 'accessory', meta: { environment: 'gymhome', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['glutes'],
    description: 'Lying on your back with knees bent, drive your hips up by squeezing your glutes until your body forms a straight line. Lower slowly.___Single leg: Extend one leg for more challenge.',
    substitutes: ['hip_thrust'],
  },
  cable_kickback: {
    type: 'accessory', meta: { environment: 'gym', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['glutes'],
    description: 'Attached to a low cable with an ankle cuff, kick your leg backward and upward squeezing the glute at the top. Lower slowly and repeat on both sides.',
    substitutes: ['glute_bridge', 'hip_thrust'],
  },
  // ── CALVES ─────────────────────────────────────────
  standing_calf_raise: {
    type: 'accessory', meta: { environment: 'gymhome', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['calves'],
    description: 'Standing with the balls of your feet on a raised surface, rise up onto your toes as high as possible. Lower your heels below the platform level for full range.___Loaded: Hold dumbbells or use a machine.',
    substitutes: ['seated_calf_raise', 'leg_press_calf_raise'],
  },
  seated_calf_raise: {
    type: 'accessory', meta: { environment: 'gym', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['calves'],
    description: 'Seated in the calf raise machine with pads on your knees, rise up onto your toes as high as possible. Lower heels below the platform for full range.',
    substitutes: ['standing_calf_raise'],
  },
  // ── ABS ────────────────────────────────────────────
  plank: {
    type: 'accessory', meta: { environment: 'gymhome', level: [0,1,2], equipment: [] },
    unit: 'duration', muscles: ['abs'],
    description: 'In a forearm plank position with elbows under shoulders, hold your body in a straight line from head to heels. Squeeze core and glutes.___Side plank: Rotate onto one forearm for oblique focus.',
    substitutes: ['ab_wheel_rollout', 'dead_bug'],
  },
  crunches: {
    type: 'accessory', meta: { environment: 'gymhome', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['abs'],
    description: 'Lying on your back with knees bent and hands behind your head, curl your shoulders up toward your knees contracting your abs. Lower slowly.___Cable: Use a high cable for added resistance.',
    substitutes: ['plank', 'leg_raise'],
  },
  leg_raise: {
    type: 'accessory', meta: { environment: 'gymhome', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['abs'],
    description: 'Lying flat with hands under your glutes, raise your legs together until perpendicular to the floor. Lower slowly without touching the ground.___Hanging: Perform hanging from a pull-up bar.',
    substitutes: ['crunches', 'plank'],
  },
  ab_wheel_rollout: {
    type: 'accessory', meta: { environment: 'gymhome', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['abs'],
    description: 'Kneeling with both hands on the ab wheel, roll forward stretching your body out as far as possible while keeping your core tight. Roll back to the start position.',
    substitutes: ['plank', 'leg_raise'],
  },
  dead_bug: {
    type: 'accessory', meta: { environment: 'gymhome', level: [0,1,2], equipment: [] },
    unit: 'reps', muscles: ['abs'],
    description: 'Lying on your back with arms raised toward the ceiling and knees at 90 degrees, lower one arm and the opposite leg toward the floor while keeping your lower back pressed down. Return and repeat.',
    substitutes: ['plank', 'crunches'],
  },
};
