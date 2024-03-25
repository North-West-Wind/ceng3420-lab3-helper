export const NAMES = [
	"IRD",
	"J6",
	"J5",
	"J4",
	"J3",
	"J2",
	"J1",
	"J0",
	"LD.PC",
	"LD.MAR",
	"LD.MDR",
	"LD.IR",
	"LD.REG",
	"LD.BEN",
	"GatePC",
	"GateMAR",
	"GateMDR",
	"GateALUSHF",
	"GateRS2",
	"PCMUX",
	"ADDR1MUX",
	"(Empty)",
	"ADDR2MUX",
	"(Empty)",
	"MARMUX",
	"MDRMUX",
	"RS2MUX",
	"RS2En",
	"RS1En",
	"MIO_EN",
	"WE",
	"DATASIZE",
	"RESET"
];

export const STATE_NAMES = new Map<number, string>();
STATE_NAMES.set(0, "MAR <- PC; PC <- PC + 4");
STATE_NAMES.set(37, STATE_NAMES.get(0)!);
STATE_NAMES.set(1, "MDR <- MEMORY[MAR]");
STATE_NAMES.set(5, "IR <- MDR");
STATE_NAMES.set(7, "IR[6:0]");
STATE_NAMES.set(19, "rd <- rs1 op imm12 (I-Type)");
STATE_NAMES.set(51, "rd <- rs1 op rs2 (R-Type)");
STATE_NAMES.set(99, "Compare (B-Type)");
STATE_NAMES.set(100, "Set LD.BEN (LD.BEN = 1)");
STATE_NAMES.set(96, "B = 0; MAR <- PC; PC <- PC + 4");
STATE_NAMES.set(104, "PC <- Branch's PC + imm12");
STATE_NAMES.set(3, "MAR <- load address (lb, lh, lw)");
STATE_NAMES.set(2, "MDR <- Memory[MAR]");
STATE_NAMES.set(6, "rd <- MDR");
STATE_NAMES.set(35, "MAR <- store address (sb, sh, sw)");
STATE_NAMES.set(32, "MDR <- rs2");
STATE_NAMES.set(33, "Memory[MAR] <- MDR");
STATE_NAMES.set(55, "Set MARMUX (MARMUX = 1) (lui)");
STATE_NAMES.set(111, "rd <- PC + 4 (jal)");
STATE_NAMES.set(112, "PC <- JAL's PC + imm20");
STATE_NAMES.set(103, "rd <- PC + 4 (jalr)");
STATE_NAMES.set(102, "PC <- rs1 + imm12");

export const LONGEST_NAME = 10;