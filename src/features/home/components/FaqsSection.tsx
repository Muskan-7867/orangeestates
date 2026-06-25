import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '#/components/ui/accordion';

const questions = [
	{
		id: 'item-1',
		title: 'How do I schedule a property viewing?',
		content:
			'You can book a viewing directly through our website by selecting your preferred property and clicking "Schedule a Tour". Our team will confirm your appointment within 24 hours. Viewings are available 7 days a week, including evenings.',
	},
	{
		id: 'item-2',
		title: 'What documents do I need to buy a property?',
		content:
			"To purchase a property you'll typically need a valid government-issued ID, proof of income or employment, bank statements from the last 3\u20136 months, and a mortgage pre-approval letter (if financing). Our agents will guide you through every step.",
	},
	{
		id: 'item-3',
		title: 'Do you offer properties for both buying and renting?',
		content:
			'Yes. Orange Estates offers an extensive portfolio of properties available for sale, long-term rent, and short-term lease. Use the filters on our listings page to find exactly what suits your needs and budget.',
	},
	{
		id: 'item-4',
		title: 'How long does the buying process take?',
		content:
			'The timeline varies depending on financing and legal checks, but a typical purchase takes between 4–12 weeks from offer acceptance to key handover. Our dedicated team ensures a smooth, transparent process throughout.',
	},
	{
		id: 'item-5',
		title: 'Can I list my property with Orange Estates?',
		content:
			'Absolutely. We offer competitive commission rates and comprehensive marketing — professional photography, virtual tours, and premium listing placement across major real estate portals. Contact us for a free valuation.',
	},
	{
		id: 'item-6',
		title: 'Are there any hidden fees or charges?',
		content:
			'We believe in full transparency. All applicable fees — including agency commission, stamp duty, and registration costs — are clearly outlined upfront before you sign any agreement. No surprises, ever.',
	},
	{
		id: 'item-7',
		title: 'Do you provide assistance with mortgages and financing?',
		content:
			'Yes. We partner with a network of trusted mortgage advisors and financial institutions who can help you explore the best financing options. Our team can arrange a consultation at no extra cost.',
	},
];

export function FaqsSection() {
	return (
		<section className="w-full  py-20 px-4">

		
			{/* Header */}
			<div className="mx-auto max-w-5xl mb-14 text-center">
		
				<h2 className="text-4xl md:text-5xl font-serif text-primary mb-4 leading-tight">
					Frequently Asked Questions
				</h2>
				<p className="text-gray-500 max-w-xl mx-auto text-base text-sm">
					Everything you need to know about buying, renting, or listing a property with Orange Estates.
				</p>
			</div>

			{/* Two-column layout on desktop */}
			<div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
				{[questions.slice(0, Math.ceil(questions.length / 2)), questions.slice(Math.ceil(questions.length / 2))].map(
					(col, colIdx) => (
						<Accordion
							key={colIdx}
							type="single"
							collapsible
							defaultValue={colIdx === 0 ? 'item-1' : undefined}
							className="w-full"
						>
							{col.map((item) => (
								<AccordionItem
									key={item.id}
									value={item.id}
									className="border-b border-gray-200 last:border-none"
								>
									<AccordionTrigger className="px-0 py-5 text-left text-[15px] font-semibold text-gray-800 leading-snug hover:no-underline  transition-colors duration-200 ">
										{item.title}
									</AccordionTrigger>
									<AccordionContent className="px-0 pb-5 text-gray-500 text-sm leading-relaxed">
										{item.content}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					)
				)}
			</div>

		</section>
	);
}
