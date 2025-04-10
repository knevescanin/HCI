import AnchorLinkIcon from "@/app/components/UI/AnchorLinkIcon";
import Link from "next/link";

export default function Page() {


	return (
		<div className="pl-8 pt-10">
			<h1 className="text-5xl font-bold mb-10">Introduction</h1>
			<p className="text-textPrimary my-4">What is pricehare, what does it do and why should you use it?</p>

			<h2 className="text-4xl font-bold mb-[32px] mt-[72px]" id="what-is-pricehare">
				<Link href="#what-is-pricehare"><AnchorLinkIcon /></Link>What is pricehare?
			</h2>
			<p className="text-textPrimary my-4">
				Pricehare is an innovative platform designed to simplify the process of sharing and comparing prices for various products and services. It allows users to create and share price lists, collaborate with others, and make informed purchasing decisions. By providing a centralized hub for price information, Pricehare empowers users to save time, reduce costs, and make smarter financial choices.
			</p>

			<h2 className="text-4xl font-bold mb-[32px] mt-[72px]" id="how-does-pricehare-work">
				<Link href="#how-does-pricehare-work"><AnchorLinkIcon /></Link>How does pricehare work?
			</h2>
			<p className="text-textPrimary my-4">
				Pricehare works by enabling users to create detailed price lists for products or services they are interested in. These lists can be shared with friends, family, or colleagues, who can then contribute their own findings or suggestions. The platform aggregates all the data, providing a comprehensive view of pricing options. Additionally, Pricehare integrates with various online retailers and marketplaces, allowing users to fetch real-time price updates and compare deals effortlessly.
			</p>

			<h2 className="text-4xl font-bold mb-[32px] mt-[72px]" id="why-should-i-use-pricehare">
				<Link href="#why-should-i-use-pricehare"><AnchorLinkIcon /></Link>Why should I use pricehare?
			</h2>
			<p className="text-textPrimary my-4">
				Using Pricehare offers numerous benefits, including the ability to make well-informed purchasing decisions, save money, and collaborate with others in your network. Whether you're planning a group purchase, organizing a budget, or simply looking for the best deal, Pricehare provides the tools and insights you need. Its user-friendly interface and powerful features make it an indispensable resource for anyone looking to optimize their spending and stay informed about market trends.
			</p>

			
		</div>
	);
}
