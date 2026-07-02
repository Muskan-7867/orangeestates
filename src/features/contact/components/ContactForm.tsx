import { Send } from "lucide-react";
import { useState } from "react";


export default function ContactForm ({formRef, setSubmitted}: {formRef: React.RefObject<HTMLFormElement | null>; setSubmitted: (submitted: boolean) => void}) {
  const [loading, setLoading] = useState(false);


     const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

    return (
                 <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {/* Name row */}
                <div className="form-field grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-widest text-gray-400">
                      First Name <span className="text-primary">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Eleanor"
                      className=" bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-300"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-widest text-gray-400">
                      Last Name <span className="text-primary">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Whitfield"
                      className="bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-300"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-field flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-gray-400">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="eleanor@example.com"
                    className="bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-300"
                  />
                </div>

                {/* Phone */}
                <div className="form-field flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-gray-400">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+44 7700 000000"
                    className=" bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-300"
                  />
                </div>

                {/* Interest */}
                <div className="form-field flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-gray-400">
                    I'm interested in…
                  </label>
                  <select
                    className="bg-white border border-gray-200 px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option>Buying a property</option>
                    <option>Selling a property</option>
                    <option>Renting / Lettings</option>
                    <option>Property valuation</option>
                    <option>General enquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div className="form-field flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-gray-400">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us how we can help…"
                    className=" bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-300 resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="form-field pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-10 py-4 text-sm tracking-wide hover:bg-primary-dark transition-colors duration-300 disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={15} />
                    )}
                    {loading ? "Sending…" : "Send Message"}
                  </button>
                </div>
              </form>
    )
}