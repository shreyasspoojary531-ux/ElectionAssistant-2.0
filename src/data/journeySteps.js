export const journeySteps = [
  {
    id: 'booth',
    title: 'Find your polling booth',
    subtitle: 'Know your exact location before polling day gets busy.',
    icon: 'MapPinned',
    content: [
      'Check your polling station details through the official voter services portal or your voter slip.',
      'Confirm the booth address, part number, and serial number ahead of time.',
      'Plan your travel and timing so you are not rushing during the busiest hours.',
    ],
    tips: [
      'Save a screenshot of the booth details on your phone.',
      'Ask a family member or local BLO for help if the location looks unfamiliar.',
    ],
  },
  {
    id: 'carry',
    title: 'Carry the essentials',
    subtitle: 'A smooth voting day starts with the right documents in hand.',
    icon: 'Briefcase',
    content: [
      'Bring your voter ID if you have it, and keep a backup identity proof ready.',
      'Carry water, any medicine you need, and a charged phone.',
      'Dress comfortably and keep your documents easy to access in line.',
    ],
    tips: [
      'If your EPIC is unavailable, check the currently accepted identity documents on the official voter portal.',
      'Avoid carrying campaign material into the polling area.',
    ],
  },
  {
    id: 'station',
    title: 'What happens at the station',
    subtitle: 'The process is structured so every voter moves through the same checkpoints.',
    icon: 'Landmark',
    content: [
      'Officials verify your name and identity before you receive permission to vote.',
      'Your finger is usually marked with indelible ink after verification.',
      'You are then directed to the EVM and VVPAT unit to cast your vote privately.',
    ],
    tips: [
      'Listen to the polling officers and wait for your turn calmly.',
      'You can ask for clarification if you are unsure which desk to approach next.',
    ],
  },
  {
    id: 'evm',
    title: 'How the EVM works',
    subtitle: 'Voting on the machine is quick once you see the ballot panel.',
    icon: 'Cpu',
    content: [
      'The ballot unit lists candidates and symbols next to individual buttons.',
      'Press the button for your chosen candidate only once when instructed.',
      'The connected VVPAT briefly shows a printed slip view so you can confirm your choice.',
    ],
    tips: [
      'If the machine is not enabled yet, wait for the polling officer to signal you.',
      'You may also choose NOTA if that option is available on the ballot panel.',
    ],
  },
  {
    id: 'recorded',
    title: 'How your vote is recorded',
    subtitle: 'The machine and paper trail work together to confirm the vote was captured.',
    icon: 'ShieldCheck',
    content: [
      'After you press the button, the machine registers the vote electronically.',
      'The VVPAT window shows your selected candidate slip for a few seconds before it drops into a sealed box.',
      'That paper trail supports verification procedures defined by election authorities.',
    ],
    tips: [
      'If the displayed slip does not match what you selected, alert the polling officer immediately.',
      'Do not leave the voting compartment until you are sure the confirmation view appeared.',
    ],
  },
  {
    id: 'dos-donts',
    title: "Voting day do's and don'ts",
    subtitle: 'A few simple habits keep the experience respectful and disruption-free.',
    icon: 'BadgeCheck',
    content: [
      'Do follow polling staff instructions and respect the queue.',
      'Do keep your vote private and avoid discussing preferences inside the polling station.',
      'Do not use your phone in the voting compartment or try to photograph the ballot unit.',
    ],
    tips: [
      'Arrive early if long lines are common in your area.',
      'Be patient with senior citizens and first-time voters around you.',
    ],
  },
]
