export default [
  /* Main skills */
  { id: 1, displayName: 'Whiplash', technicalName: 'whiplash', type: 'Ability' },
  { id: 2, displayName: 'Bloodsucker', technicalName: 'bloodsucker', type: 'Ability' },
  { id: 3, displayName: 'Swarm', technicalName: 'swarm', type: 'Ability' },
  { id: 4, displayName: 'Bloodbolt', technicalName: 'bloodbolt', type: 'Ability' },
  { id: 5, displayName: 'Heartbeat', technicalName: 'heartbeat', type: 'Ability' },
  { id: 6, displayName: 'Blood Spikes', technicalName: 'bloodspikes', type: 'Ability' },
  { id: 7, displayName: 'Altar of Gore', technicalName: 'altarofgore', type: 'Ability' },

  /* Whiplash */
  { id: 8, parentId: 1, displayName: 'Bloodboil Explosion', technicalName: 'bloodboilexplosion', type: 'Major' },
  { id: 9, parentId: 1, displayName: 'Quick Fix', technicalName: 'quickfix', type: 'Major' },
  { id: 10, parentId: 1, displayName: 'Blood Clot', technicalName: 'bloodclot', type: 'Major' },

  /* Bloodsucker */
  { id: 11, parentId: 2, displayName: 'Infusion I', technicalName: 'infusion1', type: 'Minor' },
  { id: 12, parentId: 11, displayName: 'Infusion II', technicalName: 'infusion2', type: 'Minor' },
  { id: 13, parentId: 12, displayName: 'Infusion III', technicalName: 'infusion3', type: 'Minor' },
  { id: 14, parentId: 13, displayName: 'Blood Force', technicalName: 'bloodforce', type: 'Major' },

  { id: 15, parentId: 2, displayName: 'Animalistic Speed I', technicalName: 'animalisticspeed1', type: 'Minor' },
  { id: 16, parentId: 15, displayName: 'Animalistic Speed II', technicalName: 'animalisticspeed2', type: 'Minor' },
  { id: 17, parentId: 16, displayName: 'Animalistic Speed III', technicalName: 'animalisticspeed3', type: 'Minor' },
  { id: 18, parentId: 17, displayName: 'Panic', technicalName: 'panic', type: 'Major' },

  { id: 19, parentId: 2, displayName: 'A Bite From Beyond I', technicalName: 'abitefrombeyond1', type: 'Minor' },
  { id: 20, parentId: 19, displayName: 'A Bite From Beyond II', technicalName: 'infusabitefrombeyond2ion2', type: 'Minor' },
  { id: 21, parentId: 20, displayName: 'A Bite From Beyond III', technicalName: 'abitefrombeyond3', type: 'Minor' },
  { id: 22, parentId: 21, displayName: 'Extreme Gore', technicalName: 'extreme gore', type: 'Major' },

  /* Swarm */
  { id: 23, parentId: 3, displayName: 'Decay I', technicalName: 'decay1', type: 'Minor' },
  { id: 24, parentId: 23, displayName: 'Decay II', technicalName: 'decay2', type: 'Minor' },
  { id: 25, parentId: 24, displayName: 'Decay III', technicalName: 'decay3', type: 'Minor' },
  { id: 26, parentId: 25, displayName: 'Spawn of Darkness', technicalName: 'spawnofdarkness', type: 'Major' },

  { id: 27, parentId: 3, displayName: 'For the Swarm I', technicalName: 'fortheswarm1', type: 'Minor' },
  { id: 28, parentId: 27, displayName: 'For the Swarm II', technicalName: 'fortheswarm2', type: 'Minor' },
  { id: 29, parentId: 28, displayName: 'For the Swarm III', technicalName: 'fortheswarm3', type: 'Minor' },
  { id: 30, parentId: 29, displayName: 'Vortex', technicalName: 'vortex', type: 'Major' },

  { id: 31, parentId: 3, displayName: 'Protection of Flesh I', technicalName: 'protectionofflesh1', type: 'Minor' },
  { id: 32, parentId: 31, displayName: 'Protection of Flesh II', technicalName: 'protectionofflesh2', type: 'Minor' },
  { id: 33, parentId: 32, displayName: 'Protection of Flesh III', technicalName: 'protectionofflesh3', type: 'Minor' },
  { id: 34, parentId: 33, displayName: 'Rejuvenation', technicalName: 'rejuvenation', type: 'Major' }
] as SkillTree.INode[];
