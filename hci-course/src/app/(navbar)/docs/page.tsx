"use client"

import LoadingUI from '@/app/components/UI/LoadingUI';
import { useState, useEffect } from 'react';

export default function Page() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 30000); // 3 seconds timeout

		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
			{isLoading ? <LoadingUI /> : <div>Content Loaded</div>}
		</div>
	);
}
