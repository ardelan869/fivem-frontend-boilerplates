import { createPool, Pool } from 'mysql2';
import { getEnvVar } from './index.js';

let pool: Pool;

const handleDisconnect = () => {
	pool = createPool({
		host: getEnvVar('DB_HOST'),
		user: getEnvVar('DB_USER'),
		password: getEnvVar('DB_PASSWORD'),
		database: getEnvVar('DB_DATABASE'),
		connectionLimit: 100,
		waitForConnections: true,
		queueLimit: 0,
	});

	pool.getConnection((err, connection) => {
		if (err) throw err;

		console.log('Connected to database');

		connection.on('connect', () => connection.release());
	});

	pool.on('error', function (err) {
		switch (err.code) {
			case 'PROTOCOL_CONNECTION_LOST':
				handleDisconnect();
				break;
			default:
				throw err;
		}
	});
};

handleDisconnect();

export function query(query: string, values?: any[]): unknown {
	return new Promise((resolve) => {
		pool.getConnection((err, connection) => {
			if (err) throw err;

			connection.query(query, values, (err, res) => {
				if (err) throw err;

				connection.release();
				resolve(res);
			});
		});
	});
}
