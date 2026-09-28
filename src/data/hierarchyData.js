export const CHAPTERS = [
  { id: 'pyramid', num: '01', name: 'Pyramid', title: 'The Big Picture, Speed Gap & Kitchen Analogy', pill: 'Pyramid & Overview' },
  { id: 'levels', num: '02', name: 'Memory', title: 'Registers, L1-L3, DRAM, SSD & Wait Cycles', pill: 'Memory Tiers' },
  { id: 'simulation', num: '03', name: 'Live', title: 'Watch CPU Lookups & Data Bus Flow Step-by-Step', pill: 'Live Simulator' },
  { id: 'cache-concepts', num: '04', name: 'Cache', title: 'Temporal/Spatial Locality, Matrix Demo & Address Tags', pill: 'Cache & Locality' },
  { id: 'performance', num: '05', name: 'AMAT', title: 'Access Time Calculator & The Memory Wall', pill: 'AMAT & Performance' },
  { id: 'quiz', num: '06', name: 'Knowledge', title: 'Mastery Quiz & Architectural Certification', pill: 'Knowledge Lab' },
];

export const PYRAMID_TIERS = [
  {
    id: 'registers',
    tierNum: '01',
    name: 'CPU Registers',
    icon: '▦',
    color: '#0891b2',
    latency: '0.25 – 0.5 ns',
    cycles: '0 – 1 cycle',
    capacity: '1 – 2 KB total',
    bandwidth: '~10,000 GB/s',
    cost: '~$500,000 / GB',
    widthPercent: 38,
    tech: 'Static Flip-Flops (Multi-Ported D-Latch)',
    volatility: 'Yes (Volatile)',
    location: 'Inside Execution Pipeline (ALU)',
    role: 'Holds operands directly referenced by machine instructions (e.g. RAX, RBX, RSP). Zero wait cycles needed for basic arithmetic.',
    takeaway: 'The fastest storage in the universe, etched directly into the ALU. Extremely scarce (typically 16 to 32 general purpose registers per thread).'
  },
  {
    id: 'l1',
    tierNum: '02',
    name: 'L1 Cache (Split I/D)',
    icon: 'L1',
    color: '#0284c7',
    latency: '0.8 – 1.2 ns',
    cycles: '3 – 5 cycles',
    capacity: '32 – 128 KB per core',
    bandwidth: '~2,500 GB/s',
    cost: '~$20,000 / GB',
    widthPercent: 47,
    tech: '6-Transistor SRAM (6T-SRAM)',
    volatility: 'Yes (Volatile)',
    location: 'On-Core Dedicated',
    role: 'Split into L1-Instruction (L1i) and L1-Data (L1d) caches to eliminate pipeline structural hazards during simultaneous instruction fetch and memory load/store operations.',
    takeaway: 'The primary shield protecting the CPU pipeline from pipeline stalls. Has a >95% hit rate in typical software.'
  },
  {
    id: 'l2',
    tierNum: '03',
    name: 'L2 Cache',
    icon: 'L2',
    color: '#4f46e5',
    latency: '3 – 5 ns',
    cycles: '12 – 14 cycles',
    capacity: '512 KB – 2 MB per core',
    bandwidth: '~1,000 GB/s',
    cost: '~$5,000 / GB',
    widthPercent: 56,
    tech: '6T or 8T SRAM',
    volatility: 'Yes (Volatile)',
    location: 'Dedicated per-core buffer',
    role: 'Acts as a secondary buffer catching L1 misses. Unified for both instructions and data, absorbing loop buffers and medium-sized working sets.',
    takeaway: 'Slightly slower than L1, but 10x to 16x larger. Prevents the core from making costly off-core requests.'
  },
  {
    id: 'l3',
    tierNum: '04',
    name: 'L3 Cache (Last Level LLC)',
    icon: 'L3',
    color: '#7c3aed',
    latency: '10 – 20 ns',
    cycles: '35 – 60 cycles',
    capacity: '16 – 128 MB (Up to 96MB+ with 3D V-Cache)',
    bandwidth: '~400 – 600 GB/s',
    cost: '~$1,000 / GB',
    widthPercent: 65,
    tech: 'High-density SRAM / 3D Stacking',
    volatility: 'Yes (Volatile)',
    location: 'Shared across all cores on die',
    role: 'Last line of defense before the CPU must leave the silicon chip. Sliced into banks connected by a high-speed ring or 2D mesh interconnect.',
    takeaway: 'Crucial for multi-threaded performance and gaming. Stacking 64MB of 3D V-Cache directly on top of compute cores yields massive gaming gains.'
  },
  {
    id: 'ram',
    tierNum: '05',
    name: 'Main Memory (RAM / DRAM)',
    icon: 'RAM',
    color: '#059669',
    latency: '50 – 100 ns',
    cycles: '150 – 300 cycles',
    capacity: '16 – 128 GB (Up to TBs on servers)',
    bandwidth: '50 – 100 GB/s (DDR5 Dual Channel)',
    cost: '~$3 – $5 / GB',
    widthPercent: 74,
    tech: '1-Transistor 1-Capacitor DRAM (1T1C)',
    volatility: 'Yes (Volatile)',
    location: 'Off-Chip Motherboard DIMMs',
    role: 'Holds all active running programs, OS kernel pages, heap objects, and game assets. Connects via high-speed memory controller across PCB bus traces.',
    takeaway: 'Inexpensive and massive capacity, but the CPU sits stalled for ~250 clock cycles whenever data must be pulled from DRAM.'
  },
  {
    id: 'ssd',
    tierNum: '06',
    name: 'NVMe Solid-State Drive (SSD)',
    icon: 'SSD',
    color: '#d97706',
    latency: '25 – 100 μs (microseconds)',
    cycles: '100,000 – 400,000 cycles',
    capacity: '512 GB – 8 TB',
    bandwidth: '3 – 14 GB/s (PCIe 5.0 x4)',
    cost: '~$0.08 – $0.15 / GB',
    widthPercent: 83,
    tech: '3D NAND Flash (Charge Trap / TLC)',
    volatility: 'No (Non-Volatile)',
    location: 'M.2 PCIe Expansion Bus',
    role: 'Persistent storage for file systems, installed applications, and virtual memory swap space. High throughput via NVMe protocols.',
    takeaway: '800x slower in latency than RAM. An OS page fault requires context switching to another process while waiting for SSD response.'
  },
  {
    id: 'hdd',
    tierNum: '07',
    name: 'Magnetic Hard Disk (HDD)',
    icon: 'HDD',
    color: '#e11d48',
    latency: '5 – 15 ms (milliseconds)',
    cycles: '20,000,000 – 60,000,000 cycles',
    capacity: '2 TB – 28 TB+',
    bandwidth: '150 – 250 MB/s',
    cost: '~$0.015 / GB',
    widthPercent: 92,
    tech: 'Spinning Aluminum Platters & Read Heads',
    volatility: 'No (Non-Volatile)',
    location: 'SATA Interface / NAS Storage',
    role: 'Archival bulk backup and cold data storage. Physical mechanical latency dominated by arm seek time and rotational delay.',
    takeaway: 'Millions of clock cycles to access. A single mechanical seek takes long enough for the CPU to have executed 40 million instructions!'
  }
];

export const KITCHEN_ANALOGY = [
  {
    tierNum: '01',
    name: 'CPU Registers',
    humanTime: '1 second',
    color: '#0891b2',
    iconTitle: "Chef's Hands & Cutting Board",
    desc: 'Ingredients already in your hands, ready to be sliced instantly with zero delay.',
    latency: '0.25 – 0.5 ns',
    cycles: '0 – 1 cycle',
    capacity: '1 – 2 KB total'
  },
  {
    tierNum: '02',
    name: 'L1 Cache (Split I/D)',
    humanTime: '3 seconds',
    color: '#0284c7',
    iconTitle: 'Countertop Prep Station',
    desc: 'Right on the table next to the cutting board. Just reach your hand out to grab.',
    latency: '0.8 – 1.2 ns',
    cycles: '3 – 5 cycles',
    capacity: '32 – 128 KB per core'
  },
  {
    tierNum: '03',
    name: 'L2 Cache',
    humanTime: '10 seconds',
    color: '#4f46e5',
    iconTitle: 'Spice Rack & Overhead Shelf',
    desc: 'A short step away on the kitchen shelf. Very fast to retrieve without leaving the station.',
    latency: '3 – 5 ns',
    cycles: '12 – 14 cycles',
    capacity: '512 KB – 2 MB per core'
  },
  {
    tierNum: '04',
    name: 'L3 Cache (Last Level LLC)',
    humanTime: '45 seconds',
    color: '#7c3aed',
    iconTitle: 'Walk-in Kitchen Pantry',
    desc: 'Walk across the kitchen to the pantry room. Contains large bulk quantities for all chefs.',
    latency: '10 – 20 ns',
    cycles: '35 – 60 cycles',
    capacity: '16 – 128 MB (Up to 96MB+ with 3D V-Cache)'
  },
  {
    tierNum: '05',
    name: 'Main Memory (RAM / DRAM)',
    humanTime: '5.5 minutes',
    color: '#059669',
    iconTitle: 'Neighborhood 24/7 Supermarket',
    desc: 'Stop cooking, put on your coat, and walk 3 blocks to the supermarket down the street.',
    latency: '50 – 100 ns',
    cycles: '150 – 300 cycles',
    capacity: '16 – 128 GB (Up to TBs on servers)'
  },
  {
    tierNum: '06',
    name: 'NVMe Solid-State Drive (SSD)',
    humanTime: '3.8 days',
    color: '#d97706',
    iconTitle: 'Wholesale Industrial Warehouse',
    desc: 'Get in your truck and drive across state lines to a regional logistics fulfillment warehouse.',
    latency: '25 – 100 μs (microseconds)',
    cycles: '100,000 – 400,000 cycles',
    capacity: '512 GB – 8 TB'
  },
  {
    tierNum: '07',
    name: 'Magnetic Hard Disk (HDD)',
    humanTime: '1.2 years',
    color: '#e11d48',
    iconTitle: 'Container Cargo Ship from Overseas',
    desc: 'Place an order and wait for a freighter ship to cross the ocean and deliver by rail.',
    latency: '5 – 15 ms (milliseconds)',
    cycles: '20,000,000 – 60,000,000 cycles',
    capacity: '2 TB – 28 TB+'
  }
];

export const SIMULATION_SCENARIOS = [
  {
    id: 'sc1',
    title: 'Scenario 1: L1 Cache Hit',
    tag: 'Best Case (0.9 ns)',
    latencyText: '0.9 ns (4 cycles)',
    itemContext: 'Variable: int user_score',
    targetAddr: '0x7FFF0040',
    targetTier: 'L1',
    hitOutcome: 'L1 HIT',
    steps: [
      {
        action: 'CPU Generates Address',
        message: 'CPU Execution Unit executes: MOV EAX, [0x7FFF0040]. Address split into Tag (0x7FFF), Set Index (Set 1), and Offset (Byte 0).',
        activeHw: 'cpu',
        busActive: 'l1-bus',
        accumulatedLatency: '0.25 ns'
      },
      {
        action: 'L1 Cache Lookup',
        message: 'L1 Data Cache queries Set 1. Comparator matches Tag 0x7FFF. Valid bit is 1. HIT detected!',
        activeHw: 'l1',
        busActive: 'l1-bus',
        accumulatedLatency: '0.90 ns'
      },
      {
        action: 'Data Return to Pipeline',
        message: 'L1 delivers 4-byte payload 0x0000002A directly to EAX register. Zero pipeline stalls. Complete in 4 clock cycles!',
        activeHw: 'cpu',
        busActive: 'none',
        accumulatedLatency: '0.90 ns'
      }
    ]
  },
  {
    id: 'sc2',
    title: 'Scenario 2: L1 Miss → L2 Cache Hit',
    tag: 'Fast Fallback (4.2 ns)',
    latencyText: '4.2 ns (14 cycles)',
    itemContext: 'Array Element: buffer[128]',
    targetAddr: '0x7FFF0820',
    targetTier: 'L2',
    hitOutcome: 'L2 HIT',
    steps: [
      {
        action: 'CPU Generates Address',
        message: 'CPU requests address 0x7FFF0820 for array item.',
        activeHw: 'cpu',
        busActive: 'l1-bus',
        accumulatedLatency: '0.25 ns'
      },
      {
        action: 'L1 Cache Miss',
        message: 'L1 Cache checks Set 32. Tag mismatch! Request propagated down internal core bus to L2 buffer.',
        activeHw: 'l1',
        busActive: 'l2-bus',
        accumulatedLatency: '1.10 ns'
      },
      {
        action: 'L2 Cache Hit',
        message: 'L2 Cache comparator finds matching tag in Way 4. 64-byte cache line retrieved.',
        activeHw: 'l2',
        busActive: 'l2-bus',
        accumulatedLatency: '3.80 ns'
      },
      {
        action: 'L1 Fill & CPU Forwarding',
        message: 'Cache line promoted into L1 (spatial locality) and requested dword forwarded to CPU ALU. Total time: 14 clock cycles.',
        activeHw: 'cpu',
        busActive: 'none',
        accumulatedLatency: '4.20 ns'
      }
    ]
  },
  {
    id: 'sc3',
    title: 'Scenario 3: L1 & L2 Miss → L3 (LLC) Hit',
    tag: 'Cross-Core Shared (14.5 ns)',
    latencyText: '14.5 ns (45 cycles)',
    itemContext: 'Shared Function Pointer: *draw_frame',
    targetAddr: '0x0040A100',
    targetTier: 'L3',
    hitOutcome: 'L3 HIT',
    steps: [
      {
        action: 'Core L1 & L2 Miss',
        message: 'Data not in private L1 or L2 core caches. Request dispatched onto the on-die Ring / Mesh interconnect bus.',
        activeHw: 'l2',
        busActive: 'l3-bus',
        accumulatedLatency: '4.50 ns'
      },
      {
        action: 'L3 Slice Arbitration',
        message: 'Address hash routes request to L3 Slice 3. Cross-core snoop check confirms no other core holds dirty copy.',
        activeHw: 'l3',
        busActive: 'l3-bus',
        accumulatedLatency: '12.00 ns'
      },
      {
        action: 'L3 Cache Hit',
        message: 'L3 hits! Line transmitted back across ring interconnect to Core 0. Promoted into both L2 and L1. CPU resumes.',
        activeHw: 'cpu',
        busActive: 'none',
        accumulatedLatency: '14.50 ns'
      }
    ]
  },
  {
    id: 'sc4',
    title: 'Scenario 4: All Caches Miss → DRAM Fetch',
    tag: 'Off-Chip Trip (82.0 ns)',
    latencyText: '82.0 ns (260 cycles)',
    itemContext: 'Heap Object: new CustomerRecord()',
    targetAddr: '0x1A2B3C40',
    targetTier: 'RAM',
    hitOutcome: 'DRAM ACCESS',
    steps: [
      {
        action: 'On-Chip Caches Exhausted',
        message: 'L1 Miss → L2 Miss → L3 Miss. Request forwarded to Integrated Memory Controller (IMC). CPU pipeline stalls.',
        activeHw: 'l3',
        busActive: 'ram-bus',
        accumulatedLatency: '18.00 ns'
      },
      {
        action: 'Off-Chip Bus & Row Activation',
        message: 'IMC drives row address down DDR5 command bus (tRAS). Memory die activates wordline and charges sense amplifiers.',
        activeHw: 'ram',
        busActive: 'ram-bus',
        accumulatedLatency: '55.00 ns'
      },
      {
        action: 'CAS Column Read & Burst Transfer',
        message: 'Column Address Strobe (CAS) selected. 64-byte burst read across 128-bit dual channel data bus back to processor.',
        activeHw: 'ram',
        busActive: 'ram-bus',
        accumulatedLatency: '78.00 ns'
      },
      {
        action: 'Inclusive Cache Line Allocation',
        message: 'Data fills into L3, L2, L1 and CPU registers. CPU wakes up after 260 idle clock cycles!',
        activeHw: 'cpu',
        busActive: 'none',
        accumulatedLatency: '82.00 ns'
      }
    ]
  },
  {
    id: 'sc5',
    title: 'Scenario 5: Virtual Memory Page Fault',
    tag: 'OS Kernel Trap (120 μs)',
    latencyText: '120.0 μs (400,000 cycles)',
    itemContext: 'Virtual Page: Swap / Mapped File',
    targetAddr: '0x00007FFF_E000',
    targetTier: 'SSD',
    hitOutcome: 'PAGE FAULT',
    steps: [
      {
        action: 'MMU TLB Miss & Page Table Walk',
        message: 'Memory Management Unit (MMU) checks Page Table. Valid bit is 0! The virtual page is swapped out on SSD disk.',
        activeHw: 'cpu',
        busActive: 'none',
        accumulatedLatency: '95.00 ns'
      },
      {
        action: 'Hardware Interrupt & OS Trap',
        message: 'CPU hardware generates Page Fault Exception (#PF). OS kernel traps, saves register state, and schedules PCIe NVMe driver.',
        activeHw: 'cpu',
        busActive: 'none',
        accumulatedLatency: '1.50 μs'
      },
      {
        action: 'NVMe SSD 4KB Page Read',
        message: 'SSD controller reads 4096-byte memory page via DMA into a free physical DRAM frame.',
        activeHw: 'ram',
        busActive: 'ram-bus',
        accumulatedLatency: '115.00 μs'
      },
      {
        action: 'Page Table Update & Process Resumed',
        message: 'OS sets Valid bit = 1 in Page Table and restarts faulted instruction. Over 400,000 CPU clock cycles spent!',
        activeHw: 'cpu',
        busActive: 'none',
        accumulatedLatency: '120.00 μs'
      }
    ]
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: 'MEMORY LEVELS',
    question: 'Which memory tier has the lowest access latency and is directly referenced by CPU assembly instructions?',
    options: [
      { letter: 'A', text: 'Level 1 Data Cache (L1d)' },
      { letter: 'B', text: 'CPU General Purpose Registers', correct: true },
      { letter: 'C', text: 'Translation Lookaside Buffer (TLB)' },
      { letter: 'D', text: 'Main Memory (RAM)' }
    ],
    explanation: 'CPU Registers are etched directly inside the ALU/execution pipeline and respond in a fraction of a nanosecond (0.25 – 0.5 ns), referenced directly by registers like RAX, RBX, etc.'
  },
  {
    id: 2,
    category: 'SPEED GAP',
    question: 'If a modern CPU clock cycle (0.25 ns) is scaled to 1 human second, approximately how long would fetching data from Main RAM take on a human scale?',
    options: [
      { letter: 'A', text: 'About 10 seconds' },
      { letter: 'B', text: 'About 45 seconds' },
      { letter: 'C', text: 'About 5.5 minutes', correct: true },
      { letter: 'D', text: 'Over 3 days' }
    ],
    explanation: 'Main Memory takes around 80 ns. At 1 cycle (0.25 ns) = 1 second, 80 ns equals 320 seconds, or approximately 5.5 minutes (a walk down to the supermarket)!'
  },
  {
    id: 3,
    category: 'CACHE MECHANICS',
    question: 'Why do modern CPUs split Level 1 (L1) cache into separate Instruction (L1i) and Data (L1d) caches?',
    options: [
      { letter: 'A', text: 'To allow simultaneous instruction fetch and memory load/store operations without structural pipeline stalls.', correct: true },
      { letter: 'B', text: 'Because instructions are always written in assembly while data is written in binary.' },
      { letter: 'C', text: 'To prevent computer viruses from infecting data files.' },
      { letter: 'D', text: 'Because L1i uses DRAM and L1d uses SRAM.' }
    ],
    explanation: 'Split Harvard architecture allows the processor to fetch the next instruction from L1i at the exact same clock cycle as an ALU instruction loads data from L1d, eliminating structural hazards.'
  },
  {
    id: 4,
    category: 'SILICON CELL PHYSICS',
    question: 'What is the primary physical difference between SRAM (Cache) and DRAM (Main Memory)?',
    options: [
      { letter: 'A', text: 'SRAM uses magnetic disk sectors, while DRAM uses flash floating gates.' },
      { letter: 'B', text: 'SRAM uses 6 transistors in a cross-coupled flip-flop; DRAM uses 1 transistor and 1 capacitor.', correct: true },
      { letter: 'C', text: 'DRAM never leaks charge, while SRAM requires constant periodic refreshing.' },
      { letter: 'D', text: 'SRAM is non-volatile, while DRAM is volatile.' }
    ],
    explanation: 'DRAM stores bits as tiny charges in a 1T1C capacitor (extremely compact, but leaks and requires refreshing). SRAM uses 6 transistors to form a bistable latch (instantaneous, never leaks, but takes 6x more silicon).'
  },
  {
    id: 5,
    category: 'LOCALITY OF REFERENCE',
    question: 'When code accesses a single 4-byte integer in memory, why does the hardware fetch an entire 64-byte cache line?',
    options: [
      { letter: 'A', text: 'To exploit Spatial Locality, anticipating that adjacent data will soon be needed by subsequent instructions.', correct: true },
      { letter: 'B', text: 'Because CPUs cannot compute numbers smaller than 64 bytes.' },
      { letter: 'C', text: 'To prevent memory leaks in the Operating System.' },
      { letter: 'D', text: 'Because DDR5 wires physically cannot send fewer than 1024 bits at a time.' }
    ],
    explanation: 'Spatial locality states that if you access item i, you will almost certainly access item i+1 soon (like in an array or sequential code). Fetching 64 bytes makes the next 15 integer accesses free hits!'
  },
  {
    id: 6,
    category: 'PROGRAMMING PERFORMANCE',
    question: 'Why does traversing a 2D matrix in Row-Major order (`matrix[i][j]`) execute vastly faster than Column-Major order (`matrix[j][i]`) in C/C++?',
    options: [
      { letter: 'A', text: 'Row-major order accesses contiguous memory addresses, maximizing cache line hits.', correct: true },
      { letter: 'B', text: 'Column-major order causes syntax errors in modern compilers.' },
      { letter: 'C', text: 'Because columns in mathematics are always slower than rows.' },
      { letter: 'D', text: 'The CPU must reboot when traversing columns.' }
    ],
    explanation: 'In C/C++, matrices are stored contiguously row by row. Reading row-major means each cache line fetch satisfies multiple iterations. Column-major jumps by an entire row on every step, causing cache thrashing!'
  },
  {
    id: 7,
    category: 'ADDRESS DECODING',
    question: 'In a 32-bit direct-mapped cache with 64-byte cache lines and 64 sets, how many bits are used for the Block Offset?',
    options: [
      { letter: 'A', text: '4 bits' },
      { letter: 'B', text: '6 bits', correct: true },
      { letter: 'C', text: '12 bits' },
      { letter: 'D', text: '20 bits' }
    ],
    explanation: 'The block offset selects which byte inside the 64-byte line is needed. Offset bits = log2(64) = 6 bits.'
  },
  {
    id: 8,
    category: 'CACHE MISS CLASSIFICATION',
    question: 'What type of cache miss occurs when two memory addresses map to the exact same cache set index, repeatedly evicting each other?',
    options: [
      { letter: 'A', text: 'Compulsory Miss (Cold Start)' },
      { letter: 'B', text: 'Capacity Miss' },
      { letter: 'C', text: 'Conflict Miss (Collision)', correct: true },
      { letter: 'D', text: 'Bus Protocol Miss' }
    ],
    explanation: 'A Conflict Miss occurs when multiple active memory lines contend for the same set in a direct-mapped or set-associative cache, solved by increasing associativity (e.g. 4-way to 8-way).'
  },
  {
    id: 9,
    category: 'AMAT & EFFICIENCY',
    question: 'In the Average Memory Access Time formula: AMAT = Hit Time + (Miss Rate × Miss Penalty), what is the most effective way to minimize AMAT?',
    options: [
      { letter: 'A', text: 'Increasing L1 Cache Hit Rate, because it prevents the high miss penalty of lower tiers.', correct: true },
      { letter: 'B', text: 'Using hard disk drives instead of SSDs.' },
      { letter: 'C', text: 'Lowering the processor clock frequency.' },
      { letter: 'D', text: 'Eliminating the L2 cache completely.' }
    ],
    explanation: 'Because lower tiers (DRAM, SSD) have massive miss penalties, keeping the L1 hit rate high (95%+) ensures the CPU rarely pays the multi-cycle penalty.'
  },
  {
    id: 10,
    category: 'CUTTING-EDGE HARDWARE',
    question: 'How does AMD 3D V-Cache achieve a 96MB+ L3 cache without ballooning the surface area of the main compute die?',
    options: [
      { letter: 'A', text: 'By stacking a 64MB SRAM silicon die vertically on top of the compute cores using Through-Silicon Vias (TSVs).', correct: true },
      { letter: 'B', text: 'By using mechanical spinning micro-disks.' },
      { letter: 'C', text: 'By downloading cache from cloud servers over Wi-Fi 7.' },
      { letter: 'D', text: 'By storing cache in the motherboard power supply.' }
    ],
    explanation: 'AMD 3D V-Cache vertically bonds a 64MB SRAM cache die directly on top of the compute CCD using Through-Silicon Vias (TSVs), tripling L3 cache without increasing planar die footprint.'
  }
];
