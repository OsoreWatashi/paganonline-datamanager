export default [
  /* Main skills */
  { id: 1, displayName: 'Whiplash', technicalName: 'whiplash', type: 'Ability', levelRequirement: 1, minimumPoints: 1, maximumPoints: 1, description: 'A furious long range whip combo.' },
  { id: 2, displayName: 'Bloodsucker', technicalName: 'bloodsucker', type: 'Ability', levelRequirement: 2, minimumPoints: 0, maximumPoints: 3, description: 'Send out a huge blood bat that inflicts damage to all enemies it passes through and then returns to the caster, healing it for every enemy hit.', effects: [{ id: 0, text: 'Physical Damage 200%' }, { id: 1, text: 'Range 8m' }, { id: 2, text: 'Life Leech 3%' }] },
  { id: 3, displayName: 'Swarm', technicalName: 'swarm', type: 'Ability', levelRequirement: 6, minimumPoints: 0, maximumPoints: 3, description: 'Summon a swarm of bats that inflicts bleed and to any enemy that enters the area.' },
  { id: 4, displayName: 'Bloodbolt', technicalName: 'bloodbolt', type: 'Ability', levelRequirement: 9, minimumPoints: 0, maximumPoints: 3, description: 'Expend your own blood andcest a powerful projectile that explodes for small AOE when it hits an enemy. The projectile explodes leaving blood fragments on the ground.' },
  { id: 5, displayName: 'Heartbeat', technicalName: 'heartbeat', type: 'Ability', levelRequirement: 12, minimumPoints: 0, maximumPoints: 3, description: 'Summon a huge beating heart that explodes after a short period, dealing massive damage in the area around it. Hitting the heart with primary attacks makes the effect more powerful.' },
  { id: 6, displayName: 'Blood Spikes', technicalName: 'bloodspikes', type: 'Ability', levelRequirement: 17, minimumPoints: 0, maximumPoints: 3, description: 'Summon blood spikes from the ground to impale enemies, inflicting stun and low damage over time.' },
  { id: 7, displayName: 'Altar of Gore', technicalName: 'altarofgore', type: 'Ability', levelRequirement: 19, minimumPoints: 0, maximumPoints: 3, description: 'Impale single enemy on a blood spear and make a blood altar out of it. Enemy is stunned for the duration and receives continuous damage while all allies in the radius leech health.' },

  /* Whiplash */
  { id: 8, parentId: 1, displayName: 'Bloodboil Explosion', technicalName: 'bloodboilexplosion', type: 'Major', levelRequirement: 1, minimumPoints: 0, maximumPoints: 1, description: 'Last combo hit has 20% chance to cause enemies to explode when dying for 100% physical damage in 3m radius.' },
  { id: 9, parentId: 1, displayName: 'Quick Fix', technicalName: 'quickfix', type: 'Major', levelRequirement: 1, minimumPoints: 0, maximumPoints: 1, description: 'Each Combo hit reduces Vitality Rush cooldown by 0.3s' },
  { id: 10, parentId: 1, displayName: 'Blood Clot', technicalName: 'bloodclot', type: 'Major', levelRequirement: 2, minimumPoints: 0, maximumPoints: 1, description: 'Last combo hit has 20% chance to spawn blood fragment.' },

  /* Bloodsucker */
  { id: 11, parentId: 2, displayName: 'Infusion I', technicalName: 'infusion1', type: 'Minor', levelRequirement: 2, minimumPoints: 0, maximumPoints: 1, description: 'Additional Life Leech per enemy hit.' },
  { id: 12, parentId: 11, displayName: 'Infusion II', technicalName: 'infusion2', type: 'Minor', levelRequirement: 4, minimumPoints: 0, maximumPoints: 1, description: 'Additional Life Leech per enemy hit.' },
  { id: 13, parentId: 12, displayName: 'Infusion III', technicalName: 'infusion3', type: 'Minor', levelRequirement: 6, minimumPoints: 0, maximumPoints: 1, description: 'Additional Life Leech per enemy hit.' },
  { id: 14, parentId: 13, displayName: 'Blood Force', technicalName: 'bloodforce', type: 'Major', levelRequirement: 6, minimumPoints: 0, maximumPoints: 1, description: 'If an enemy is hit twice With the same bat and it does not die, it drops a blood fragment.' },

  { id: 15, parentId: 2, displayName: 'Animalistic Speed I', technicalName: 'animalisticspeed1', type: 'Minor', levelRequirement: 4, minimumPoints: 0, maximumPoints: 1, description: 'Gain move speed buff for 5 seconds for each enemy hit.' },
  { id: 16, parentId: 15, displayName: 'Animalistic Speed II', technicalName: 'animalisticspeed2', type: 'Minor', levelRequirement: 6, minimumPoints: 0, maximumPoints: 1, description: 'Gain move speed buff for 5 seconds for each enemy hit.' },
  { id: 17, parentId: 16, displayName: 'Animalistic Speed III', technicalName: 'animalisticspeed3', type: 'Minor', levelRequirement: 7, minimumPoints: 0, maximumPoints: 1, description: 'Gain move speed buff for 5 seconds for each enemy hit.' },
  { id: 18, parentId: 17, displayName: 'Panic', technicalName: 'panic', type: 'Major', levelRequirement: 8, minimumPoints: 0, maximumPoints: 1, description: 'Recast bloodsucker to detonate it and fear all enemies for 4s.' },

  { id: 19, parentId: 2, displayName: 'A Bite From Beyond I', technicalName: 'abitefrombeyond1', type: 'Minor', levelRequirement: 2, minimumPoints: 0, maximumPoints: 1, description: 'Range increased.' },
  { id: 20, parentId: 19, displayName: 'A Bite From Beyond II', technicalName: 'infusabitefrombeyond2ion2', type: 'Minor', levelRequirement: 4, minimumPoints: 0, maximumPoints: 1, description: 'Range increased.' },
  { id: 21, parentId: 20, displayName: 'A Bite From Beyond III', technicalName: 'abitefrombeyond3', type: 'Minor', levelRequirement: 6, minimumPoints: 0, maximumPoints: 1, description: 'Range increased.' },
  { id: 22, parentId: 21, displayName: 'Extreme Gore', technicalName: 'extreme gore', type: 'Major', levelRequirement: 8, minimumPoints: 0, maximumPoints: 1, description: 'Double Damage to targets affected With Bleed.' },

  /* Swarm */
  { id: 23, parentId: 3, displayName: 'Decay I', technicalName: 'decay1', type: 'Minor', levelRequirement: 6, minimumPoints: 0, maximumPoints: 1, description: 'Swarm also inflicts Slow.' },
  { id: 24, parentId: 23, displayName: 'Decay II', technicalName: 'decay2', type: 'Minor', levelRequirement: 6, minimumPoints: 0, maximumPoints: 1, description: 'Swarm also inflicts Slow.' },
  { id: 25, parentId: 24, displayName: 'Decay III', technicalName: 'decay3', type: 'Minor', levelRequirement: 6, minimumPoints: 0, maximumPoints: 1, description: 'Swarm also inflicts Slow.' },
  { id: 26, parentId: 25, displayName: 'Spawn of Darkness', technicalName: 'spawnofdarkness', type: 'Major', levelRequirement: 6, minimumPoints: 0, maximumPoints: 1, description: 'When the swarm expires, one Level 1 Bloodsucker spawns from it center, and flies towards nearest living enemy.' },

  { id: 27, parentId: 3, displayName: 'For the Swarm I', technicalName: 'fortheswarm1', type: 'Minor', levelRequirement: 7, minimumPoints: 0, maximumPoints: 1, description: 'AOE Radius Increased.' },
  { id: 28, parentId: 27, displayName: 'For the Swarm II', technicalName: 'fortheswarm2', type: 'Minor', levelRequirement: 8, minimumPoints: 0, maximumPoints: 1, description: 'AOE Radius Increased.' },
  { id: 29, parentId: 28, displayName: 'For the Swarm III', technicalName: 'fortheswarm3', type: 'Minor', levelRequirement: 9, minimumPoints: 0, maximumPoints: 1, description: 'AOE Radius Increased.' },
  { id: 30, parentId: 29, displayName: 'Vortex', technicalName: 'vortex', type: 'Major', levelRequirement: 11, minimumPoints: 0, maximumPoints: 1, description: 'When swarm expires it pulls all enemies in lom radius towards it.' },

  { id: 31, parentId: 3, displayName: 'Protection of Flesh I', technicalName: 'protectionofflesh1', type: 'Minor', levelRequirement: 6, minimumPoints: 0, maximumPoints: 1, description: 'All allies receive physical and elemental resistances when standing in the Swarm.' },
  { id: 32, parentId: 31, displayName: 'Protection of Flesh II', technicalName: 'protectionofflesh2', type: 'Minor', levelRequirement: 6, minimumPoints: 0, maximumPoints: 1, description: 'All allies receive physical and elemental resistances when standing in the Swarm.' },
  { id: 33, parentId: 32, displayName: 'Protection of Flesh III', technicalName: 'protectionofflesh3', type: 'Minor', levelRequirement: 6, minimumPoints: 0, maximumPoints: 1, description: 'All allies receive physical and elemental resistances when standing in the Swarm.' },
  { id: 34, parentId: 33, displayName: 'Rejuvenation', technicalName: 'rejuvenation', type: 'Major', levelRequirement: 6, minimumPoints: 0, maximumPoints: 1, description: 'When swarm expires it heals you and all allies in lom radius for 10% of their max health.' }
] as SkillTree.INode[];
