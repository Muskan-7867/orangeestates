import { CheckCircle, Mail, Phone } from "lucide-react";
import { useState } from "react";

export default function PropertyInquiryForm({ property }: { property: any }) {

    const [formSubmitted, setFormSubmitted] = useState(false);


    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 5000);
    };

    return (
        <div className="bg-white p-6 sm:p-8 border border-primary/10">
            <div className="text-center pb-6 border-b border-gray-100">
                <h3 className="font-serif text-xl text-gray-950 font-semibold">Inquire About This Listing</h3>
                <p className="text-xs text-gray-500 mt-1">Our specialized property advisors are ready to assist you.</p>
            </div>

            {formSubmitted ? (
                <div className="py-10 text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full">
                        <CheckCircle size={24} />
                    </div>
                    <h4 className="font-serif text-lg font-semibold text-gray-900">Information Requested</h4>
                    <p className="text-sm text-gray-600">
                        Thank you! An Orange Estates specialist will contact you shortly with the details.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            placeholder="Enter your full name"
                            className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="Enter your email"
                            className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            required
                            placeholder="Enter phone number"
                            className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            defaultValue={`I am interested in viewing this property: ${property.title}.`}
                            className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/95 text-white py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors shadow-md hover:shadow-lg active:scale-98 cursor-pointer mt-4"
                    >
                        Send Inquiry
                    </button>
                </form>
            )}

    
        </div>

    )
}