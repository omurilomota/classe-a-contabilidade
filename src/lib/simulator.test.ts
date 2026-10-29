import { describe, expect, it } from "vitest";
import { EMPTY_ANSWERS, getSimulatorResult, type SimulatorAnswers } from "./simulator";

const answers = (partial: Partial<SimulatorAnswers>): SimulatorAnswers => ({
  ...EMPTY_ANSWERS,
  ...partial,
});

describe("getSimulatorResult", () => {
  it("pede análise individual quando falta resposta", () => {
    const result = getSimulatorResult(answers({ revenue: "ate81" }));
    expect(result.type).toBe("contador");
    expect(result.badge).toBe("Análise individual");
  });

  it("indica MEI para faturamento baixo, atividade permitida e até 1 funcionário", () => {
    const result = getSimulatorResult(
      answers({ revenue: "ate81", activity: "permitida", employees: "1" }),
    );
    expect(result.type).toBe("mei");
    expect(result.title).toContain("MEI");
  });

  it("indica Simples quando o perfil não cabe no MEI", () => {
    const result = getSimulatorResult(
      answers({ revenue: "ate4800", activity: "nao_permitida", employees: "2mais" }),
    );
    expect(result.type).toBe("simples");
    expect(result.badge).toContain("Simples");
  });

  it("encaminha faturamento acima de R$ 4,8 milhões para análise", () => {
    const result = getSimulatorResult(
      answers({ revenue: "acima4800", activity: "permitida", employees: "0" }),
    );
    expect(result.type).toBe("contador");
    expect(result.caveats.join(" ")).toContain("não calcula impostos");
  });

  it("não promete MEI quando a atividade é desconhecida", () => {
    const result = getSimulatorResult(
      answers({ revenue: "ate81", activity: "nao_sei", employees: "0" }),
    );
    expect(result.badge).toContain("provável");
    expect(result.nextSteps.join(" ")).toContain("Confirmar a atividade");
  });
});
