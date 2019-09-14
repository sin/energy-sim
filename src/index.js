import './styles.css';
import { updateCharts } from './simulator';
import {
	POWER_TABLE_LABELS,
	ADJUSTED_POWER_TABLE_LABELS,
	ENERGY_TABLE_LABELS,
	POWER_CHART_LABELS,
	FUEL_TABLE_LABELS
} from './simulator/constants';

const [
	powerTable,
	adjustedPowerTable,
	energyTable,
	adjustedEnergyTable,
	powerChartData,
	[installed, available],
	fuelTable,
	[fuel, waste, co2]
] = updateCharts();

const formatter = object =>
	object.map(row => `<td>${row.join('</td><td>')}</td>`).join('</tr><tr>');

document.getElementById('app').innerHTML = `<div class="wrapper">

<h2>Available Power: ${available} / ${installed} MW</h2>

<hr>

<h3>Power Table (MW)</h3>
<table>
<tr><th>${POWER_TABLE_LABELS.join('</th><th>')}</th></tr>
<tr>${formatter(powerTable)}</tr>
</table>

<h3>Adjusted Power Table (MW)</h3>
<table>
<tr class="green"><th>${ADJUSTED_POWER_TABLE_LABELS.join('</th><th>')}</th></tr>
<tr>${formatter(adjustedPowerTable)}</tr>
</table>

<hr>

<h3>Energy Table (TWh)</h3>
<table>
<tr class="blue"><th>${ENERGY_TABLE_LABELS.join('</th><th>')}</th></tr>
<tr>${formatter(energyTable)}</tr>
</table>

<h3>Adjusted Energy Table (TWh)</h3>
<table>
<tr><th>${ENERGY_TABLE_LABELS.join('</th><th>')}</th></tr>
<tr>${formatter(adjustedEnergyTable)}</tr>
</table>

<hr>

<h3>Installed and Available Power (MW)</h3>
<table>
<tr class="green"><th>${POWER_CHART_LABELS.join('</th><th>')}</th></tr>
<tr>${formatter(powerChartData)}</tr>
</table>

<h3>Fuel, Waste and CO2 Emissions</h3>
<table>
<tr class="blue"><th>${FUEL_TABLE_LABELS.join('</th><th>')}</th></tr>
<tr>${formatter(fuelTable)}</tr>
<tr>
<td><strong>Total</th>
<td><strong>${fuel}</td>
<td><strong>${waste}</td>
<td><strong>${co2}</td></tr>
</table>

</div>`;
