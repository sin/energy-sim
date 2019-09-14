import { INSTALLED_POWERS, CAPACITY_FACTORS, REGULATING_POWER_LABELS } from './constants';
import { installedToEnergy, round, powerToEnergy } from './utils';

import { createPowerTable } from './createPowerTable';
import { createAdjustedPowerTable } from './createAdjustedPowerTable';
import { createEnergyTable } from './createEnergyTable';
import { createAdjustedEnergyTable } from './createAdjustedEnergyTable';
import { createPowerChartTable } from './createPowerChartTable';
import { createFuelTable } from './createFuelTable';

export const updateCharts = () => {
	const regulatingEnergy = REGULATING_POWER_LABELS.map(installedToEnergy);
	const [hydro, oil, gas] = regulatingEnergy;
	const reserveEnergy = round(oil + gas);

	const powerTable = createPowerTable();
	const adjustedPowerTable = createAdjustedPowerTable(powerTable);
	const [powerChartTable, ...powerSummary] = createPowerChartTable();

	const energyTable = createEnergyTable(powerTable, regulatingEnergy);
	const { energyBalance } = createAdjustedEnergyTable(adjustedPowerTable, hydro, reserveEnergy);

	const [fuelTable, ...wasteSummary] = createFuelTable(energyTable);

	const gasPower = (INSTALLED_POWERS.gas * CAPACITY_FACTORS.gas) / 100;
	const oilPower = (INSTALLED_POWERS.oil * CAPACITY_FACTORS.oil) / 100;

	const gasAvailable = powerToEnergy(gasPower);
	const oilAvailable = powerToEnergy(oilPower);

	const gasTime = Math.min(1, -energyBalance / gasAvailable);
	const gasDemand = powerToEnergy(gasTime * gasPower);

	const oilTime = Math.min(1, (-energyBalance - gasDemand) / oilAvailable);
	const oilDemand = powerToEnergy((oilTime * INSTALLED_POWERS.oil * CAPACITY_FACTORS.oil) / 100);
	const regulating = gasDemand + oilDemand;

	const { adjustedEnergyTable } = createAdjustedEnergyTable(adjustedPowerTable, hydro, regulating);

	return [
		powerTable,
		adjustedPowerTable,
		energyTable,
		adjustedEnergyTable,
		powerChartTable,
		powerSummary,
		fuelTable,
		wasteSummary
	];
};
