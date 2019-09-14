import { INSTALLED_POWERS, CAPACITY_FACTORS } from './constants';
import { round, sum, transpose } from './utils';

export const createPowerChartTable = () => {
	const [installedPowers, availablePowers] = transpose(
		Object.entries(INSTALLED_POWERS)
			.slice(0, -1)
			.map(([powerType, installedPower]) => [
				installedPower,
				round((CAPACITY_FACTORS[powerType] / 100) * installedPower)
			])
	);

	const installed = installedPowers.reduce(sum);
	const available = availablePowers.reduce(sum);
	const balance = Math.min(0, round(INSTALLED_POWERS.demand - available));

	const powerChartTable = [
		['Installed', ...installedPowers, '-'],
		['Available', ...availablePowers, balance]
	];

	return [powerChartTable, installed, available, balance];
};
