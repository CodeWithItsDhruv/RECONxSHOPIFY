import React from 'react';
import { FileText, Calendar, DollarSign, Users, Shield } from 'lucide-react';

export default function FreelanceAgreement() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden" style={{ width: '210mm', maxWidth: '100%' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Freelance Development Agreement</h1>
            <p className="text-blue-100">Agreement Date: October 14, 2025</p>
            <p className="text-blue-100">Project Commencement: Upon advance payment receipt</p>
          </div>
        </div>

        <div className="p-8">
          {/* Parties Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users size={24} className="text-blue-600" />
              PARTIES
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-lg mb-2">SERVICE PROVIDER (Developer)</h3>
                <p className="text-gray-700"><strong>Name:</strong> Dhruv Rathod</p>
                <p className="text-gray-700"><strong>Email:</strong> dhurvrath@gmail.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> +91 9081608504</p>
                <p className="text-gray-700"><strong>Address:</strong> Vadodara, Gujarat, India</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="font-bold text-lg mb-2">CLIENT</h3>
                <p className="text-gray-700"><strong>Name:</strong> Rahul Ratiya</p>
                <p className="text-gray-700"><strong>Business:</strong> Recon Autobots</p>
                <p className="text-gray-700"><strong>Project:</strong> Recon Autobots Store</p>
              </div>
            </div>
          </section>

          {/* Project Overview */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText size={24} className="text-blue-600" />
              1. PROJECT OVERVIEW
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="mb-2"><strong>Project Title:</strong> Recon Autobots Store</p>
              <p className="mb-2"><strong>Type:</strong> Full-Stack ECommerce Website</p>
              <p><strong>Technology Stack:</strong> React.js, Shopify Storefront API</p>
            </div>
          </section>

          {/* Scope of Work */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. SCOPE OF WORK</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2 text-blue-700">2.1 Frontend Development</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Responsive and modern React.js user interface</li>
                  <li>Product listing pages with search and filter functionality</li>
                  <li>Shopping cart system</li>
                  <li>Checkout process with form validation</li>
                  <li>User profile and order history pages</li>
                  <li>Mobile-first responsive design</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-blue-700">2.2 Backend Infrastructure</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Shopify Headless Commerce</li>
                  <li>Shopify Storefront API for products and cart</li>
                  <li>Secure Checkout via Shopify</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-blue-700">2.3 Admin Dashboard</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Product management (Add, Edit, Delete, Update stock)</li>
                  <li>Order management and tracking system</li>
                  <li>Dashboard overview with sales analytics</li>
                  <li>Inventory management</li>
                  <li>User management capabilities</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-blue-700">2.4 Payment Integration</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Razorpay payment gateway integration</li>
                  <li>Test mode setup for development</li>
                  <li>Live mode configuration after client's business verification</li>
                  <li>Payment success and failure handling</li>
                  <li>Order confirmation system</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-blue-700">2.5 Delivery Features</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>PIN code availability checker</li>
                  <li>Delivery area validation</li>
                  <li>Shipping information management</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-blue-700">2.6 Deployment & Optimization</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Vercel or Netlify deployment</li>
                  <li>Custom domain connection (if provided by client)</li>
                  <li>Basic SEO optimization (meta tags, sitemap)</li>
                  <li>Performance testing and optimization</li>
                  <li>Cross-browser compatibility testing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cost Breakdown */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign size={24} className="text-blue-600" />
              3. DETAILED COST BREAKDOWN
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-gray-300 p-3 text-left">Module / Feature</th>
                    <th className="border border-gray-300 p-3 text-left">Description</th>
                    <th className="border border-gray-300 p-3 text-right">Cost (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">Frontend Development</td>
                    <td className="border border-gray-300 p-3">React UI, responsive pages, product listing, cart, checkout</td>
                    <td className="border border-gray-300 p-3 text-right">12,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">Firebase Backend</td>
                    <td className="border border-gray-300 p-3">Authentication, Firestore DB, storage, protected routes</td>
                    <td className="border border-gray-300 p-3 text-right">8,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">Admin Panel</td>
                    <td className="border border-gray-300 p-3">Product management, order tracking, dashboard overview</td>
                    <td className="border border-gray-300 p-3 text-right">10,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">Razorpay Integration</td>
                    <td className="border border-gray-300 p-3">Payment gateway setup, success/failure handling</td>
                    <td className="border border-gray-300 p-3 text-right">6,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">PIN Code / Delivery Checker</td>
                    <td className="border border-gray-300 p-3">Delivery availability validation by PIN code</td>
                    <td className="border border-gray-300 p-3 text-right">3,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">Deployment & Hosting Setup</td>
                    <td className="border border-gray-300 p-3">Firebase/Vercel hosting, domain connection, SEO setup</td>
                    <td className="border border-gray-300 p-3 text-right">5,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">Testing & Optimization</td>
                    <td className="border border-gray-300 p-3">Debugging, responsiveness, performance fixes</td>
                    <td className="border border-gray-300 p-3 text-right">4,850</td>
                  </tr>
                  <tr className="bg-blue-100 font-bold">
                    <td className="border border-gray-300 p-3" colSpan={2}>TOTAL PROJECT COST</td>
                    <td className="border border-gray-300 p-3 text-right">₹48,850</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar size={24} className="text-blue-600" />
              4. PROJECT TIMELINE
            </h2>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="font-bold text-lg">Estimated Completion: 25-30 business days from project start date</p>
            </div>
            <div className="space-y-3">
              <div className="flex gap-4 items-start">
                <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold min-w-24 text-center">Week 1-2</div>
                <p className="text-gray-700">Frontend development and Firebase setup</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold min-w-24 text-center">Week 2-3</div>
                <p className="text-gray-700">Admin panel and backend integration</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold min-w-24 text-center">Week 3-4</div>
                <p className="text-gray-700">Payment gateway, PIN code checker, testing</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold min-w-24 text-center">Week 4-5</div>
                <p className="text-gray-700">Deployment, optimization, and final delivery</p>
              </div>
            </div>
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-3">
              <p className="text-sm text-gray-700"><strong>Note:</strong> Timeline may be extended if client feedback or approvals are delayed beyond 48 hours.</p>
            </div>
          </section>

          {/* Payment Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. PAYMENT TERMS</h2>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="font-bold text-xl">Total Project Value: ₹48,850</p>
            </div>
            <h3 className="font-bold text-lg mb-3">Payment Schedule:</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="border border-gray-300 p-3 text-left">Milestone</th>
                    <th className="border border-gray-300 p-3 text-right">Amount</th>
                    <th className="border border-gray-300 p-3 text-center">Percentage</th>
                    <th className="border border-gray-300 p-3 text-left">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">Advance Payment</td>
                    <td className="border border-gray-300 p-3 text-right">₹19,540</td>
                    <td className="border border-gray-300 p-3 text-center">40%</td>
                    <td className="border border-gray-300 p-3">Before project start</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">Midway Payment</td>
                    <td className="border border-gray-300 p-3 text-right">₹19,540</td>
                    <td className="border border-gray-300 p-3 text-center">40%</td>
                    <td className="border border-gray-300 p-3">Upon admin panel & payment integration completion</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">Final Payment</td>
                    <td className="border border-gray-300 p-3 text-right">₹9,770</td>
                    <td className="border border-gray-300 p-3 text-center">20%</td>
                    <td className="border border-gray-300 p-3">Upon project delivery and approval</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-bold mb-2">Payment Methods:</h4>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                  <li>Bank Transfer / UPI / Online Payment</li>
                  <li>Payment details will be provided via invoice</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Payment Terms:</h4>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                  <li>All payments are non-refundable once work has commenced on that milestone</li>
                  <li>Delays in payment may result in project suspension</li>
                  <li>Final source code and deployment access will be transferred only after full payment</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Remaining Sections */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. REVISION POLICY</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Included:</strong> Maximum 2 rounds of frontend design revisions</li>
              <li><strong>Excluded:</strong> Major functionality changes or feature additions beyond agreed scope</li>
              <li>Additional revisions will be charged at ₹1,500 per revision round</li>
              <li>Backend logic changes requested after approval will be treated as new features</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. CLIENT RESPONSIBILITIES</h2>
            <p className="mb-3 text-gray-700">The Client agrees to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Provide all necessary content (product images, descriptions, business details) within 3 days of project start</li>
              <li>Provide timely feedback within 48 hours of milestone review</li>
              <li>Complete Razorpay business verification for live payment gateway</li>
              <li>Provide domain name if custom domain is required</li>
              <li>Test and approve deliverables at each milestone</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. DEVELOPER RESPONSIBILITIES</h2>
            <p className="mb-3 text-gray-700">The Developer agrees to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Deliver all work as per the agreed scope and timeline</li>
              <li>Provide regular project updates</li>
              <li>Ensure code quality and best practices</li>
              <li>Deliver source code and documentation upon final payment</li>
              <li>Provide 7 days of post-delivery support for bug fixes related to delivered features</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield size={24} className="text-blue-600" />
              9. INTELLECTUAL PROPERTY RIGHTS
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Upon full payment, all intellectual property rights for the custom code will transfer to the Client</li>
              <li>Developer retains the right to showcase the project in portfolio (with Client's permission)</li>
              <li>Third-party libraries and frameworks remain under their respective licenses</li>
              <li>Client is responsible for obtaining proper licenses for any premium assets they provide</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. WARRANTY & SUPPORT</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold mb-2 text-green-700">Included Support (7 Days Post-Delivery):</h4>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                  <li>Bug fixes related to delivered functionality</li>
                  <li>Minor adjustments and tweaks</li>
                  <li>Deployment assistance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-red-700">Not Included:</h4>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                  <li>New feature development</li>
                  <li>Third-party service issues (Firebase, Razorpay downtime)</li>
                  <li>Issues caused by client modifications to code</li>
                  <li>Hosting and domain maintenance</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-gray-700"><strong>Extended Support:</strong> Available at ₹2,000/month (optional)</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. CONFIDENTIALITY</h2>
            <p className="mb-3 text-gray-700">Both parties agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Keep all project-related information confidential</li>
              <li>Not disclose sensitive business information to third parties</li>
              <li>Protect access credentials and API keys</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">12. LIMITATION OF LIABILITY</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Developer is not liable for data loss due to third-party service failures</li>
              <li>Developer is not responsible for legal compliance (GST, business licenses, etc.)</li>
              <li>Client is responsible for content legality and copyright compliance</li>
              <li>Maximum liability is limited to the total project value</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">13. TERMINATION CLAUSE</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold mb-2">By Client:</h4>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                  <li>Client may terminate with 7 days written notice</li>
                  <li>Payment for completed work will be due immediately</li>
                  <li>No refund for advance payment if work has commenced</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">By Developer:</h4>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                  <li>Developer may terminate if payment is delayed beyond 14 days</li>
                  <li>Developer may terminate if client fails to provide necessary materials for more than 14 days</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">14. DISPUTE RESOLUTION</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Any disputes will be resolved through good-faith negotiation</li>
              <li>If unresolved, disputes will be subject to Vadodara, Gujarat jurisdiction</li>
              <li>Both parties agree to mediation before legal proceedings</li>
            </ul>
          </section>

          {/* Acceptance */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">15. ACCEPTANCE</h2>
            <p className="text-gray-700 mb-6">By signing below or making the advance payment, both parties acknowledge that they have read, understood, and agree to the terms and conditions outlined in this agreement.</p>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="border-2 border-gray-300 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">SERVICE PROVIDER</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Signature:</p>
                    <div className="border-b-2 border-gray-400 h-16"></div>
                  </div>
                  <p><strong>Name:</strong> Dhruv Rathod</p>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date:</p>
                    <div className="border-b-2 border-gray-400 h-8"></div>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-300 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">CLIENT</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Signature:</p>
                    <div className="border-b-2 border-gray-400 h-16"></div>
                  </div>
                  <p><strong>Name:</strong> Rahul Ratiya</p>
                  <p><strong>Business:</strong> Recon Autobots</p>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date:</p>
                    <div className="border-b-2 border-gray-400 h-8"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Annexure */}
          <section className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">ANNEXURE A: PROJECT QUOTATION</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Quote Reference:</strong> Q-342-RA</p>
              <p><strong>Valid Until:</strong> November 14, 2025</p>
              <p><strong>Prepared For:</strong> Rahul Ratiya / Recon Autobots</p>
              <p className="mt-4 italic">This quotation is incorporated as part of the agreement and reflects the complete scope and pricing.</p>
            </div>
          </section>

          {/* Contact Info */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-center border-b border-blue-400 pb-3">Contact Information</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm text-blue-100 mb-1">Service Provider</p>
                <p className="text-2xl font-bold">Dhruv Rathod</p>
              </div>
              <div className="hidden md:block w-px h-16 bg-blue-400"></div>
              <div className="flex flex-col gap-3">
                <a href="mailto:dhurvrath@gmail.com" className="flex items-center gap-3 bg-white bg-opacity-10 hover:bg-opacity-20 transition px-4 py-2 rounded-lg">
                  <span className="text-2xl">📧</span>
                  <span className="font-medium">dhurvrath@gmail.com</span>
                </a>
                <a href="tel:+919081608504" className="flex items-center gap-3 bg-white bg-opacity-10 hover:bg-opacity-20 transition px-4 py-2 rounded-lg">
                  <span className="text-2xl">📞</span>
                  <span className="font-medium">+91 9081608504</span>
                </a>
              </div>
            </div>
            <p className="text-center mt-4 text-blue-100 text-sm">Available for questions, clarifications, and support</p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body {
            background: white;
          }
          .min-h-screen {
            padding: 0;
          }
          .shadow-lg {
            box-shadow: none;
          }
          .rounded-lg {
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
}
