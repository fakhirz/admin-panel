import React, { Fragment } from 'react';

const Header = ({ children, title, description, collectionName, identifier }) => {
	return (
		<Fragment>
			{!title && !description && <h1>{children}</h1>}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '15px',
					jsutifyContent: 'left'
				}}
			>
				{identifier === 'newCollection' ? (
					<h1 style={{ color: '#4f4f4f' }}>{title}</h1>
				) : (
					<h1 style={{ color: '#4f4f4f' }}>
						{title} in<i> Collection {collectionName}</i>
					</h1>
				)}

				<p
					style={{
						color: 'gray'
					}}
				>
					{description}
				</p>
			</div>
		</Fragment>
	);
};

export default Header;
