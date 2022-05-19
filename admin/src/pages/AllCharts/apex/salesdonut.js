import React, { Fragment, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Spinner } from 'reactstrap';

const Salesdonut = ({
	folders,
	series,
	categories,
	products,
	pages,
	blogposts,
}) => {
	const [sets, setSeries] = useState([]);
	const [options, setOptions] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		var fs = folders ? Number(folders).toFixed(2) : 0;
		var ss = folders ? Number(series).toFixed(2) : 0;
		var cs = folders ? Number(categories).toFixed(2) : 0;
		var ps = folders ? Number(products).toFixed(2) : 0;
		var pg = folders ? Number(pages).toFixed(2) : 0;
		var bp = folders ? Number(blogposts).toFixed(2) : 0;
		setSeries([
			parseFloat(fs),
			parseFloat(ss),
			parseFloat(cs),
			parseFloat(ps),
			parseFloat(pg),
			parseFloat(bp),
		]);

		// eslint-disable-next-line
	}, [folders, series, categories, products, pages, blogposts]);

	useEffect(() => {
		setOptions({
			dataLabels: {
				enabled: false,
			},
			legend: {
				show: false,
			},
			plotOptions: {
				pie: {
					donut: {
						size: '80%',
					},
				},
			},
			colors: [
				'#ec4561',
				'#683083',
				'#f8b425',
				'#38a4f8',
				'#e83e8c',
				'#17861d',
			],
			series: [sets],
			labels: [
				'Folders',
				'Series',
				'Categories',
				'Products',
				'Pages',
				'Blog Posts',
			],
		});

		setLoading(false);
	}, [sets]);

	return loading && options === null ? (
		<Spinner />
	) : (
		<Fragment>
			<ReactApexChart
				options={options}
				series={sets}
				type='donut'
				height='220'
			/>
		</Fragment>
	);
};

export default Salesdonut;
