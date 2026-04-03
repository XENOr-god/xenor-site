export type SettlementStatus =
  | "stable"
  | "food_shortage"
  | "wood_shortage"
  | "food_and_wood_shortage";

export type SettlementWorkerAllocation = {
  farmers: number;
  loggers: number;
};

export type SettlementSimulationConfigView = {
  population: number;
  initialFood: number;
  initialWood: number;
  initialAllocation: SettlementWorkerAllocation;
  foodPerFarmer: number;
  woodPerLogger: number;
  foodConsumptionPerWorker: number;
  woodConsumptionPerTick: number;
  snapshotPolicy: string;
  validationPolicy: string;
  maxInventory: number;
};

export type SettlementScenarioExpectationView = {
  finalAllocation: SettlementWorkerAllocation;
  finalFood: number;
  finalWood: number;
  finalStatus: SettlementStatus;
  shortageTicks: number;
  totalFoodProduced: number;
  totalWoodProduced: number;
  totalFoodShortage: number;
  totalWoodShortage: number;
};

export type SettlementRunSummaryView = {
  finalTick: number;
  population: number;
  finalAllocation: SettlementWorkerAllocation;
  idleWorkers: number;
  finalFood: number;
  finalWood: number;
  lastStatus: SettlementStatus;
  shortageTicks: number;
  totalFoodProduced: number;
  totalWoodProduced: number;
  totalFoodConsumed: number;
  totalWoodConsumed: number;
  totalFoodShortage: number;
  totalWoodShortage: number;
  finalChecksum: string;
};

export type SettlementArtifactSummaryView = {
  baseSeed: string;
  finalTick: number;
  finalChecksum: string;
  configPayloadSchemaVersion: number;
  configDigest: string;
  replayDigest: string;
  snapshotDigest: string | null;
  scenarioDigest: string | null;
};

export type SettlementArtifactDigestsView = {
  configArtifact: string;
  scenarioArtifact: string | null;
  replayArtifact: string;
  snapshotArtifact: string | null;
  goldenFixture: string | null;
};

export type SettlementArtifactSizesView = {
  configArtifact: number;
  scenarioArtifact: number | null;
  replayArtifact: number;
  snapshotArtifact: number | null;
  goldenFixture: number | null;
};

export type SettlementTickDigestView = {
  tick: number;
  checksum: string;
  snapshotPresent: boolean;
  phaseOrder: string[];
  validationCheckpoints: string[];
};

export type SettlementDeterminismReportView = {
  expectationPassed: boolean;
  expectationDetail: string | null;
  rerunParityMatch: boolean;
  replayVerificationMatch: boolean;
  replayVerificationChecksum: string;
  resumeSnapshotTick: number | null;
  resumeFromSnapshotMatch: boolean;
  resumeFromSnapshotChecksum: string | null;
  fixtureVerificationPassed: boolean;
};

export type SettlementDemoScenarioView = {
  id: string;
  title: string;
  description: string;
  seed: string;
  tickCount: number;
  config: SettlementSimulationConfigView;
  expected: SettlementScenarioExpectationView;
  runSummary: SettlementRunSummaryView;
  artifactSummary: SettlementArtifactSummaryView;
  artifactDigests: SettlementArtifactDigestsView;
  artifactSizes: SettlementArtifactSizesView;
  tickDigestView: SettlementTickDigestView[];
  determinism: SettlementDeterminismReportView;
};

export type SettlementDemoCatalog = {
  engineFamily: string;
  scenarioCount: number;
  scenarios: SettlementDemoScenarioView[];
};
