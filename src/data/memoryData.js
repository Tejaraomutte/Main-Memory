export const MEMORY_COMPONENTS = [
  {
    id: 'dram',
    name: 'DRAM',
    fullName: 'Dynamic Random-Access Memory',
    category: 'Primary Working Memory',
    badge: 'Volatile • Main Memory',
    accentColor: '#0284c7',
    iconName: 'Cpu',
    tagline: 'The computer’s spacious working desk where running apps live.',
    analogy: {
      title: 'The Office Desk',
      summary: 'When you work on multiple projects, you spread papers out on your desk so you can reach them in seconds. The bookshelf (storage) is too far to walk to every time. When you leave and turn off the lights, the desk gets cleared.',
      icon: '🗄️'
    },
    specs: [
      { label: 'Volatility', value: 'Volatile (Loses data without power)', highlight: true },
      { label: 'Access Time', value: '10 – 20 ns (Nanoseconds)' },
      { label: 'Cell Structure', value: '1 Transistor + 1 Capacitor (1T-1C)' },
      { label: 'Refresh Needed?', value: 'Yes (~every 64ms)' },
      { label: 'Typical Capacity', value: '8 GB – 64 GB per module' },
      { label: 'Primary Use', value: 'System RAM (DDR4 / DDR5)' }
    ],
    howItWorks: [
      {
        step: 1,
        title: 'CPU Requests an Address',
        desc: 'The CPU sends row and column address coordinates down the Address Bus to find the exact memory cell.'
      },
      {
        step: 2,
        title: 'Capacitor Stores the Bit',
        desc: 'A tiny capacitor holds electrical charge for bit 1, or empty for bit 0. Because charge slowly leaks, a refresh circuit constantly tops it up.'
      },
      {
        step: 3,
        title: 'Sense Amplifier Amplifies Signal',
        desc: 'Sensitive circuits detect the tiny voltage and send full-strength data back across the Data Bus to the CPU.'
      }
    ],
    deepDive: 'DRAM is the dominant technology for main memory because its 1-Transistor 1-Capacitor structure is extraordinarily tiny, allowing billions of memory cells to fit on a single silicon chip at very low cost per gigabyte.',
    realWorld: 'Your gaming PC or smartphone uses LPDDR5 or DDR5 DRAM. Whenever you launch a game, Discord, or a web browser, the program code is copied from your SSD into DRAM so the CPU can execute it with zero lag.',
    busRole: 'Connected directly to the CPU through the high-speed Memory Controller and Multi-Channel Memory Bus.'
  },
  {
    id: 'sram',
    name: 'SRAM',
    fullName: 'Static Random-Access Memory',
    category: 'Ultra-High-Speed Cache',
    badge: 'Volatile • CPU Cache',
    accentColor: '#8b5cf6',
    iconName: 'Zap',
    tagline: 'Lightning-fast memory built right beside the CPU cores.',
    analogy: {
      title: 'The Shirt Pocket Notepad',
      summary: 'Even faster than reaching for your desk! You keep the numbers you need this very second right in your shirt pocket so you do not even have to look away from your work.',
      icon: '⚡'
    },
    specs: [
      { label: 'Volatility', value: 'Volatile (Loses data without power)', highlight: true },
      { label: 'Access Time', value: '0.5 – 2 ns (50x faster than DRAM!)' },
      { label: 'Cell Structure', value: '4 to 6 Transistors (Flip-Flop latch)' },
      { label: 'Refresh Needed?', value: 'No (Static holding as long as powered)' },
      { label: 'Typical Capacity', value: '16 KB – 128 MB' },
      { label: 'Primary Use', value: 'CPU L1, L2, L3 Caches & Registers' }
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Bistable Latch Holds State',
        desc: 'Instead of leaky capacitors, SRAM uses cross-coupled transistors forming a flip-flop that locks into state 1 or 0 indefinitely.'
      },
      {
        step: 2,
        title: 'No Refresh Interruption',
        desc: 'Because no capacitors need recharging, SRAM is always ready for instantaneous reads and writes at clock speeds over 5 GHz.'
      },
      {
        step: 3,
        title: 'Integrated On-Die with CPU',
        desc: 'SRAM is etched directly onto the silicon wafer inches away from the Arithmetic Logic Unit (ALU) to eliminate bus delay.'
      }
    ],
    deepDive: 'Because each SRAM bit requires 6 transistors, it consumes about 6 times more silicon area than DRAM. This makes SRAM too expensive to use for all 32 GB of system RAM, but perfect for ultra-fast L1/L2/L3 caches.',
    realWorld: 'AMD 3D V-Cache and Intel Smart Cache use SRAM. When you render 3D graphics or play competitive games, SRAM feeds instructions to the CPU cores without waiting on system RAM.',
    busRole: 'Operates over ultra-wide internal CPU crossbar buses at full processor clock frequency.'
  },
  {
    id: 'rom',
    name: 'ROM',
    fullName: 'Read-Only Memory',
    category: 'Permanent Boot Memory',
    badge: 'Non-Volatile • Bootstrapping',
    accentColor: '#10b981',
    iconName: 'ShieldCheck',
    tagline: 'Permanent stone-carved instructions that never disappear.',
    analogy: {
      title: 'The Printed Recipe Card',
      summary: 'Before a chef can cook anything, they need to read the morning kitchen rules printed on the wall. Even if the kitchen has a blackout overnight, the rules are still printed on the wall the next morning.',
      icon: '📜'
    },
    specs: [
      { label: 'Volatility', value: 'Non-Volatile (Preserves data without power)', highlight: true },
      { label: 'Access Time', value: '50 – 150 ns' },
      { label: 'Write Ability', value: 'Read-only during normal operation' },
      { label: 'Refresh Needed?', value: 'No' },
      { label: 'Typical Capacity', value: '4 MB – 64 MB' },
      { label: 'Primary Use', value: 'Motherboard UEFI / BIOS, Firmware' }
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Power Button is Pressed',
        desc: 'When the PC switches on, the CPU has no software in RAM yet. The hardware points the CPU Program Counter to ROM.'
      },
      {
        step: 2,
        title: 'Power-On Self-Test (POST)',
        desc: 'Firmware inside ROM checks that the CPU, RAM sticks, and GPU are healthy and initializes hardware voltages.'
      },
      {
        step: 3,
        title: 'Bootloader Hands Over to OS',
        desc: 'ROM firmware reads the operating system bootloader from the SSD into RAM, and hands full control to Windows or Linux.'
      }
    ],
    deepDive: 'Classic ROM had its binary data etched during chip manufacturing with physical masks. Modern computers use EEPROM/Flash chips so motherboard firmware can be safely upgraded without replacing the chip.',
    realWorld: 'Your computer’s motherboard UEFI/BIOS, your microwave’s button controller, your car’s engine ECU, and your game controller all boot up using firmware stored in ROM.',
    busRole: 'Communicates through low-pin-count serial SPI or LPC bus to the motherboard chipset.'
  },
  {
    id: 'prom-eprom',
    name: 'PROM & EPROM',
    fullName: 'Programmable & Erasable ROM',
    category: 'ROM Evolution History',
    badge: 'Non-Volatile • Historical Innovation',
    accentColor: '#f59e0b',
    iconName: 'History',
    tagline: 'The bridge from unchangeable factory chips to reprogrammable silicon.',
    analogy: {
      title: 'The Typewriter & Eraser',
      summary: 'PROM was like typing with indelible ink: once typed, a mistake meant throwing the sheet away. EPROM added a magical ultraviolet eraser lamp so you could wipe the sheet clean and reuse it!',
      icon: '💡'
    },
    specs: [
      { label: 'Volatility', value: 'Non-Volatile' },
      { label: 'PROM Erasing', value: 'Impossible (Fuses are permanently blown)' },
      { label: 'EPROM Erasing', value: '20 minutes under intense UV Light' },
      { label: 'Visual Trait', value: 'Clear quartz window on top of ceramic chip' },
      { label: 'Writing Method', value: 'High voltage electrical programmer' },
      { label: 'Key Innovation', value: 'Floating-Gate MOS Transistors' }
    ],
    howItWorks: [
      {
        step: 1,
        title: 'PROM: Tiny Fusible Links',
        desc: 'Chips shipped with all bits as 1s. A programming machine fired high currents to physically burn tiny microscopic fuses to 0.'
      },
      {
        step: 2,
        title: 'EPROM: Floating Gates',
        desc: 'Trapped electrons in isolated silicon islands. To erase, intense UV light ionized the oxide layer and drained the electrons.'
      },
      {
        step: 3,
        title: 'Paved the Way for Flash',
        desc: 'The floating gate invention directly evolved into modern EEPROM, SSDs, and USB thumb drives.'
      }
    ],
    deepDive: 'Vintage 1980s arcade machines (like Pac-Man and Space Invaders) and early IBM PCs used EPROMs with small round quartz windows. Programmers had to put stickers over the window to stop sunlight from accidentally erasing the game!',
    realWorld: 'Vintage synthesizers, classic retro arcade arcade boards, and 1990s automotive control units used EPROMs for engine tuning maps.',
    busRole: 'Parallel memory bus with chip select (CS#) and output enable (OE#) lines.'
  },
  {
    id: 'eeprom',
    name: 'EEPROM & Flash',
    fullName: 'Electrically Erasable PROM',
    category: 'Modern Firmware Storage',
    badge: 'Non-Volatile • Re-programmable',
    accentColor: '#06b6d4',
    iconName: 'Layers',
    tagline: 'Update firmware with electricity while the chip stays in your device.',
    analogy: {
      title: 'The Digital Whiteboard',
      summary: 'You can write on it, erase individual words with an electric pulse without wiping the whole board, and it stays perfectly intact even when you turn off the room lights.',
      icon: '💾'
    },
    specs: [
      { label: 'Volatility', value: 'Non-Volatile' },
      { label: 'Erase Method', value: 'Electrical field (Fowler-Nordheim tunneling)' },
      { label: 'Granularity', value: 'Byte-level erase (EEPROM) or Block erase (Flash)' },
      { label: 'Endurance', value: '100,000 to 1,000,000 write cycles' },
      { label: 'Retention', value: '10+ years without power' },
      { label: 'Primary Use', value: 'SPD Chip on RAM sticks, BIOS chips, SSDs' }
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Quantum Tunneling',
        desc: 'Applying a positive electric field pulls electrons through a thin insulating oxide layer into a floating gate.'
      },
      {
        step: 2,
        title: 'Trapped Charge Shifts Threshold',
        desc: 'Trapped electrons change the voltage needed to turn on the transistor, which senses as a stored 0 or 1.'
      },
      {
        step: 3,
        title: 'In-Circuit Upgrades',
        desc: 'Because erasing is 100% electrical, you can update your computer’s BIOS from Windows without opening the case.'
      }
    ],
    deepDive: 'Every DDR4 and DDR5 RAM stick has a tiny 8-pin EEPROM chip called the SPD (Serial Presence Detect). It tells your motherboard: "Hello! I am a 16GB DDR5 stick running at 5600 MHz with timings 36-36-36-76 at 1.1 Volts!"',
    realWorld: 'The SPD chip on every RAM stick, the BIOS chip on motherboards, camera SD cards, smartphone storage, and automotive odometers all rely on EEPROM / Flash.',
    busRole: 'I2C / SMBus 2-wire serial bus for SPD, or SPI bus for BIOS flash chips.'
  },
  {
    id: 'buses',
    name: 'Memory Bus Architecture',
    fullName: 'Address, Data & Control Buses',
    category: 'System Interconnect',
    badge: 'System Highway • Synchronous Bus',
    accentColor: '#ec4899',
    iconName: 'Network',
    tagline: 'The three dedicated electronic highways linking the CPU to memory.',
    analogy: {
      title: 'The Postal Delivery Trio',
      summary: 'The Address Bus is the street address on the envelope. The Control Bus is the instruction stamp ("Deliver" or "Pick up"). The Data Bus is the letter inside the envelope carrying the message.',
      icon: '📬'
    },
    specs: [
      { label: 'Address Bus', value: 'Unidirectional: CPU → Memory (e.g. 64-bit wide)' },
      { label: 'Data Bus', value: 'Bidirectional: CPU ⇄ Memory (e.g. 64-bit wide)' },
      { label: 'Control Bus', value: 'Signals: Read/Write, Clock, Ready, Chip Select' },
      { label: 'DDR5 Transfer Rate', value: '4800 to 8400+ MT/s (MegaTransfers/sec)' },
      { label: 'Dual-Channel Width', value: '2x 32-bit subchannels (DDR5) or 128-bit total' },
      { label: 'Voltage', value: '1.1V standard DDR5' }
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Address Bus Sets Location',
        desc: 'The CPU writes the binary address (e.g. 0x7FFF0040) onto the address lines. Every memory module decodes if the address is meant for it.'
      },
      {
        step: 2,
        title: 'Control Bus Commands Operation',
        desc: 'The CPU lowers the WRITE-ENABLE line to READ, and clocks the synchronized memory clock pulse.'
      },
      {
        step: 3,
        title: 'Data Bus Carries the Payload',
        desc: 'The memory chips drive the 64 data lines high or low with the requested 8-byte payload back to the CPU.'
      }
    ],
    deepDive: 'The width of the Address Bus determines how much RAM a computer can address! An old 32-bit address bus could only address 2^32 bytes = 4 GB. Modern 64-bit processors can theoretically address 16 Exabytes of memory!',
    realWorld: 'When you plug two RAM sticks into matching motherboard slots (e.g., Slots 2 and 4), you enable Dual Channel mode, doubling the data bus bandwidth from 64 bits to 128 bits wide.',
    busRole: 'Synchronized via differential clock signals (CK_t / CK_c) at multiple gigahertz.'
  },
  {
    id: 'matrix',
    name: 'Memory Matrix & Decoders',
    fullName: '2D Grid Addressing & Sense Amps',
    category: 'Internal Silicon Organization',
    badge: 'Hardware Logic • Row/Col Decoder',
    accentColor: '#14b8a6',
    iconName: 'Grid',
    tagline: 'How billions of bits are organized into rows and columns on silicon.',
    analogy: {
      title: 'The Battleship Game Board',
      summary: 'Instead of having 64 billion separate wires, memory arranges cells in a giant grid. You only need a Row coordinate and a Column coordinate (like "B-4") to pinpoint any cell in the universe!',
      icon: '🎯'
    },
    specs: [
      { label: 'Organization', value: '2D / 3D Array of Rows (Wordlines) & Columns (Bitlines)' },
      { label: 'Row Decoder', value: 'Turns binary row address into 1 active horizontal line' },
      { label: 'Column MUX', value: 'Selects which vertical bitline connects to output' },
      { label: 'Sense Amplifier', value: 'Measures tiny millivolt delta and pulls to rail' },
      { label: 'Wire Efficiency', value: 'Reduces N*N connections to 2*N control lines' },
      { label: 'CAS Latency (tCL)', value: 'Cycles between column select and data output' }
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Row Address Strobe (RAS)',
        desc: 'Row Decoder activates one Wordline across thousands of cells, copying an entire row into Sense Amplifiers.'
      },
      {
        step: 2,
        title: 'Column Address Strobe (CAS)',
        desc: 'Column Multiplexer picks the exact column bit requested from the active row buffer.'
      },
      {
        step: 3,
        title: 'Sense & Restore',
        desc: 'Reading a DRAM cell drains its capacitor! The Sense Amp immediately re-charges the capacitor back to its original state.'
      }
    ],
    deepDive: 'This is why memory timings look like CL36-36-36-76! The numbers represent clock cycles for RAS-to-CAS delay (tRCD), Row Precharge Time (tRP), and Row Active Time (tRAS).',
    realWorld: 'A modern 16 GB DDR5 memory die has 32 internal banks, each containing tens of thousands of rows and columns working in parallel.',
    busRole: 'Multiplexed address pins receive row address first, then column address on the next clock.'
  },
  {
    id: 'hierarchy',
    name: 'Memory Hierarchy',
    fullName: 'The Pyramid of Speed & Cost',
    category: 'Computer Architecture Design',
    badge: 'Architecture • Speed vs Capacity',
    accentColor: '#6366f1',
    iconName: 'BarChart3',
    tagline: 'Why computers use multiple levels of memory instead of just one big fast chip.',
    analogy: {
      title: 'The Chef’s Kitchen Levels',
      summary: '1. Spoon in hand (CPU Register) -> 2. Prep board (L1/L2 Cache) -> 3. Kitchen table (Main RAM) -> 4. Pantry shelf (NVMe SSD) -> 5. Grocery store warehouse (Cloud Storage).',
      icon: '🏛️'
    },
    specs: [
      { label: 'Level 1: Registers', value: '0.5 ns • ~1 KB • Thousands of $/MB' },
      { label: 'Level 2: CPU Cache', value: '1 – 15 ns • 8 MB – 128 MB' },
      { label: 'Level 3: Main Memory', value: '60 – 80 ns • 16 GB – 128 GB' },
      { label: 'Level 4: NVMe SSD', value: '50,000 ns (50 μs) • 1 TB – 4 TB' },
      { label: 'Level 5: HDD / Cloud', value: '10,000,000 ns (10 ms) • Petabytes' },
      { label: 'Governing Law', value: 'Principle of Locality (Temporal & Spatial)' }
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Locality of Reference',
        desc: 'Programs tend to reuse the same data repeatedly (Temporal Locality) and access nearby memory addresses (Spatial Locality).'
      },
      {
        step: 2,
        title: 'Cache Hit vs Cache Miss',
        desc: 'If requested data is in fast L1/L2 cache (Hit: 95%+ of the time), execution proceeds instantly with no RAM delay.'
      },
      {
        step: 3,
        title: 'Graceful Degradation',
        desc: 'On a Cache Miss, the memory controller fetches a 64-byte Cache Line from DRAM into cache so subsequent accesses are instant.'
      }
    ],
    deepDive: 'If accessing a CPU register took 1 second in human time, accessing L1 cache would take 2 seconds, accessing Main RAM would take 2 minutes, and accessing an SSD would take 1.5 days!',
    realWorld: 'Operating Systems use Virtual Memory: when your 16 GB RAM fills up with too many browser tabs, Windows moves unused memory pages to a "Pagefile.sys" on your SSD.',
    busRole: 'Interconnects PCIe bus (storage), Memory bus (RAM), and on-chip Ring/Mesh interconnect (cache).'
  }
];

export const RAM_HOTSPOTS = [
  {
    id: 'dram-chips',
    title: 'DRAM Silicon ICs',
    role: 'Memory Storage Array',
    desc: 'Each black rectangular chip is a high-density BGA integrated circuit containing billions of 1T-1C memory cells arranged in banks.',
    pos: [0, 0.25, 0.12],
    tag: 'Silicon Die'
  },
  {
    id: 'gold-contacts',
    title: 'Gold Edge Connector Fingers',
    role: '288-Pin Interface Bus',
    desc: '288 electroplated gold pins connect the module to the motherboard memory bus, carrying data, address, clock, and power signals.',
    pos: [0, -0.92, 0.12],
    tag: 'Bus Connector'
  },
  {
    id: 'spd-chip',
    title: 'SPD EEPROM Chip',
    role: 'Serial Presence Detect',
    desc: 'A dedicated non-volatile EEPROM chip that stores factory timings, voltage, XMP/EXPO profiles, and manufacturer serial numbers.',
    pos: [1.2, 0.45, 0.12],
    tag: 'EEPROM'
  },
  {
    id: 'pmic',
    title: 'PMIC (Power Management IC)',
    role: 'On-Board Voltage Regulation',
    desc: 'DDR5 moves voltage regulation onto the module itself! The PMIC converts 12V from the motherboard to a clean, stable 1.1V for the DRAM chips.',
    pos: [-0.02, 0.58, 0.12],
    tag: 'Power Reg'
  },
  {
    id: 'notch',
    title: 'Mechanical Key Notch',
    role: 'Physical Keying',
    desc: 'An asymmetrical cut in the PCB edge that physically prevents installing DDR5 into DDR4 slots, or plugging the stick in backwards.',
    pos: [-0.35, -0.92, 0.12],
    tag: 'Safety Key'
  },
  {
    id: 'capacitors',
    title: 'SMD Decoupling Capacitors',
    role: 'Transient Noise Filter',
    desc: 'Tiny ceramic surface-mount capacitors placed directly adjacent to memory chips to absorb voltage spikes and prevent bit errors.',
    pos: [-1.15, -0.25, 0.12],
    tag: 'Filtering'
  }
];

export const SPEED_LEVELS = [
  {
    name: 'CPU Registers',
    latency: '0.5 ns',
    latencyNum: 0.5,
    capacity: '~1 KB',
    relativeTime: '0.5 seconds',
    color: '#ec4899',
    description: 'Inside the ALU. Executes arithmetic directly.'
  },
  {
    name: 'L1 CPU Cache',
    latency: '1.0 ns',
    latencyNum: 1.0,
    capacity: '32 KB – 64 KB',
    relativeTime: '1 second',
    color: '#8b5cf6',
    description: 'Dedicated per core. Feeds decoded micro-instructions.'
  },
  {
    name: 'L2 CPU Cache',
    latency: '4.0 ns',
    latencyNum: 4.0,
    capacity: '512 KB – 1 MB',
    relativeTime: '4 seconds',
    color: '#3b82f6',
    description: 'Intermediate buffer for instructions and data.'
  },
  {
    name: 'L3 CPU Cache',
    latency: '12.0 ns',
    latencyNum: 12.0,
    capacity: '16 MB – 96 MB',
    relativeTime: '12 seconds',
    color: '#06b6d4',
    description: 'Shared across all CPU cores. Prevents RAM bottleneck.'
  },
  {
    name: 'Main Memory (DDR5 RAM)',
    latency: '65.0 ns',
    latencyNum: 65.0,
    capacity: '16 GB – 64 GB',
    relativeTime: '1 minute 5 seconds',
    color: '#10b981',
    description: 'Your computer’s active playground for all running software.'
  },
  {
    name: 'NVMe Gen4 SSD',
    latency: '50,000 ns (50 μs)',
    latencyNum: 50000,
    capacity: '1 TB – 4 TB',
    relativeTime: '14 hours',
    color: '#f59e0b',
    description: 'Fast non-volatile storage. 800x slower than RAM!'
  },
  {
    name: 'Hard Disk Drive (HDD)',
    latency: '10,000,000 ns (10 ms)',
    latencyNum: 10000000,
    capacity: '2 TB – 20 TB',
    relativeTime: '3.8 months',
    color: '#ef4444',
    description: 'Mechanical spinning platters with magnetic heads.'
  }
];

export const BEGINNER_QUIZ = [
  {
    question: 'Why does your computer lose open browser tabs when you suddenly pull the power cord?',
    options: [
      { text: 'Main RAM is volatile memory and requires constant electrical power to hold bits.', correct: true },
      { text: 'The SSD drive runs out of battery power immediately.', correct: false },
      { text: 'The CPU permanently deletes open tabs to prevent viruses.', correct: false },
      { text: 'The computer forgets the Wi-Fi password.', correct: false }
    ],
    explanation: 'RAM is volatile. Each bit in DRAM is stored as a tiny electrical charge in a capacitor. When power stops, the charge instantly drains away!'
  },
  {
    question: 'What is the main physical difference between DRAM (Main RAM) and SRAM (CPU Cache)?',
    options: [
      { text: 'DRAM uses 1 transistor + 1 capacitor per bit; SRAM uses 4 to 6 transistors in a flip-flop.', correct: true },
      { text: 'DRAM uses magnets, while SRAM uses optical lasers.', correct: false },
      { text: 'SRAM requires constant refresh, while DRAM holds data permanently.', correct: false },
      { text: 'DRAM is located inside the CPU, while SRAM is plugged into the motherboard.', correct: false }
    ],
    explanation: 'DRAM uses a tiny 1T-1C cell (very cheap, huge capacity, but needs refresh). SRAM uses 6 transistors (instant speed, no refresh needed, but takes up way more chip space).'
  },
  {
    question: 'Which dedicated bus line tells the memory chips WHERE in memory to look?',
    options: [
      { text: 'Address Bus', correct: true },
      { text: 'Data Bus', correct: false },
      { text: 'Control Bus', correct: false },
      { text: 'Power Cable', correct: false }
    ],
    explanation: 'The Address Bus carries the memory coordinates (like a street address), the Control Bus specifies READ or WRITE, and the Data Bus carries the payload.'
  },
  {
    question: 'What is the primary role of ROM (Read-Only Memory) in a desktop PC or laptop?',
    options: [
      { text: 'Stores the motherboard firmware (UEFI/BIOS) to safely start up the hardware.', correct: true },
      { text: 'Stores downloaded Steam games for quick play.', correct: false },
      { text: 'Stores your browser history and cookies.', correct: false },
      { text: 'Acts as temporary storage for video editing.', correct: false }
    ],
    explanation: 'ROM holds permanent firmware. When you push the power button, the CPU has nothing in RAM yet, so it begins executing the boot code permanently saved in ROM.'
  },
  {
    question: 'Why can’t we simply use a fast NVMe SSD instead of having RAM in our computer?',
    options: [
      { text: 'Main RAM is roughly 800 to 1,000 times faster in latency than the fastest SSD.', correct: true },
      { text: 'SSDs cannot store numbers larger than 100.', correct: false },
      { text: 'SSDs only work when the computer is turned off.', correct: false },
      { text: 'RAM is cheaper than SSD storage per gigabyte.', correct: false }
    ],
    explanation: 'Latency! RAM responds in about 60 nanoseconds (0.00000006s), while an SSD takes 50,000 nanoseconds. If the CPU had to wait on an SSD for every calculation, your computer would crawl to an unbearable halt.'
  }
];

export const GLOSSARY_TERMS = [
  { term: 'Volatile', def: 'Memory that requires electrical power to maintain its stored information. When power is lost, data vanishes immediately.' },
  { term: 'Non-Volatile', def: 'Memory that retains its saved data even when turned off completely (e.g., ROM, NVMe SSD, EEPROM).' },
  { term: 'Capacitor', def: 'A microscopic electronic component that stores electrical energy like a miniature rechargeable battery.' },
  { term: 'Refresh Cycle', def: 'A periodic burst of current sent to DRAM capacitors every ~64 milliseconds to prevent leaked charge from causing data loss.' },
  { term: 'CAS Latency (CL)', def: 'The number of clock cycles between when the CPU requests a column of data and when the data is ready on the bus pins.' },
  { term: 'Dual Channel', def: 'Running two RAM sticks simultaneously over separate 64-bit channels to double the memory throughput bandwidth to 128 bits.' },
  { term: 'Wordline', def: 'The horizontal wire in a silicon memory matrix that activates an entire row of memory cell transistors at once.' },
  { term: 'Bitline', def: 'The vertical wire in a silicon memory matrix that transfers the stored bit from the selected cell down into the sense amplifier.' },
  { term: 'SPD (Serial Presence Detect)', def: 'A tiny EEPROM chip on every RAM stick that communicates speed, timings, and voltage profiles to the motherboard.' }
];
