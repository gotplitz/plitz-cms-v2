import React, { useEffect, useState } from 'react';

// Api Point
import { getImageApi } from '../../helpers/productApi';

const ImageProd = ({ prodimg }) => {
	const [imageData, setImageData] = useState({});

	useEffect(() => {
		const GetData = async () => {
			if (prodimg && prodimg.length > 0) {
				const imageInfo = await getImageApi(prodimg[0].id);

				setImageData(imageInfo);
			}
		};

		GetData();
	}, [prodimg]);

	return imageData && imageData.data ? (
		<React.Fragment>
			<img
				className='card-img-top img-fluid'
				src={`data:${imageData.mimeType};base64,  ${imageData.data}`}
				alt='veltrix'
			/>
		</React.Fragment>
	) : (
		<React.Fragment>
			<img
				className='card-img-top img-fluid'
				src={'uploads/big-placeholder.jpg'}
				alt='veltrix'
			/>
		</React.Fragment>
	);
};

export default ImageProd;
