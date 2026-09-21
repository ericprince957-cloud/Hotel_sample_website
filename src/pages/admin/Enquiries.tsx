import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchEnquiries, fetchEnquiryById, updateEnquiry } from "@/lib/adminApi";
import { useToast } from "@/lib/toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Search, Phone, MessageCircle, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function AdminEnquiries() {
  const { id } = useParams<{ id: string }>();

  if (id) {
    return <EnquiryDetail id={id} />;
  }

  return <EnquiriesList />;
}

function EnquiriesList() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToast } = useToast();

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter]);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const data = await fetchEnquiries({
        status: statusFilter,
        search: searchQuery || undefined,
      });
      setEnquiries(data);
    } catch (error) {
      console.error("Error loading enquiries:", error);
      addToast("error", "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadEnquiries();
  };

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-[28px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-6">
        Enquiries
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5553]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search by name or phone..."
            className="w-full h-11 pl-10 pr-3 rounded-[10px] border border-[#E2DBC9] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#B8893B]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white"
        >
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Enquiries list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-20 rounded-[10px]" />
          ))}
        </div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-12 bg-[#EDE8DC] rounded-[14px]">
          <p className="text-[16px] text-[#4A5553]">No enquiries found</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E2DBC9] text-left">
                  <th className="pb-3 text-[14px] font-medium text-[#4A5553]">Guest</th>
                  <th className="pb-3 text-[14px] font-medium text-[#4A5553]">Room</th>
                  <th className="pb-3 text-[14px] font-medium text-[#4A5553]">Dates</th>
                  <th className="pb-3 text-[14px] font-medium text-[#4A5553]">Guests</th>
                  <th className="pb-3 text-[14px] font-medium text-[#4A5553]">Status</th>
                  <th className="pb-3 text-[14px] font-medium text-[#4A5553]">Date</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry: any) => (
                  <tr key={enquiry.id} className="border-b border-[#E2DBC9]">
                    <td className="py-4">
                      <Link
                        to={`/admin/enquiries/${enquiry.id}`}
                        className="text-[16px] font-medium text-[#0F3D3E] hover:underline"
                      >
                        {enquiry.guest_name}
                      </Link>
                      <p className="text-[14px] text-[#4A5553]">{enquiry.guest_phone}</p>
                    </td>
                    <td className="py-4 text-[14px] text-[#4A5553]">
                      {enquiry.rooms?.name || "—"}
                    </td>
                    <td className="py-4 text-[14px] text-[#4A5553]">
                      {enquiry.check_in} to {enquiry.check_out}
                    </td>
                    <td className="py-4 text-[14px] text-[#4A5553]">{enquiry.guests}</td>
                    <td className="py-4">
                      <span className="capitalize px-2 py-1 rounded-full bg-[#EDE8DC] text-[12px] text-[#0F3D3E]">
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="py-4 text-[14px] text-[#4A5553]">
                      {new Date(enquiry.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {enquiries.map((enquiry: any) => (
              <Link
                key={enquiry.id}
                to={`/admin/enquiries/${enquiry.id}`}
                className="block bg-white border border-[#E2DBC9] rounded-[10px] p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[16px] font-medium text-[#0F3D3E]">
                    {enquiry.guest_name}
                  </p>
                  <span className="capitalize px-2 py-0.5 rounded-full bg-[#EDE8DC] text-[12px] text-[#0F3D3E]">
                    {enquiry.status}
                  </span>
                </div>
                <p className="text-[14px] text-[#4A5553] mb-1">{enquiry.guest_phone}</p>
                <p className="text-[14px] text-[#4A5553]">
                  {enquiry.rooms?.name || "No room"} · {enquiry.check_in} to {enquiry.check_out}
                </p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function EnquiryDetail({ id }: { id: string }) {
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    loadEnquiry();
  }, [id]);

  const loadEnquiry = async () => {
    try {
      const data = await fetchEnquiryById(id);
      if (data) {
        setEnquiry(data);
        setStatus(data.status);
        setNotes(data.admin_notes || "");
      }
    } catch (error) {
      console.error("Error loading enquiry:", error);
      addToast("error", "Failed to load enquiry");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await updateEnquiry(id, { status, admin_notes: notes });
      if (result.success) {
        addToast("success", "Enquiry updated");
      } else {
        addToast("error", result.error || "Failed to update");
      }
    } catch (error) {
      addToast("error", "Failed to update enquiry");
    } finally {
      setSaving(false);
    }
  };

  const whatsappUrl = enquiry
    ? `https://wa.me/${enquiry.guest_phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        `Hello ${enquiry.guest_name}, thank you for your enquiry with ${siteConfig.name}. We're reviewing your request and will get back to you shortly.`
      )}`
    : "";

  if (loading) {
    return (
      <div className="p-6 md:p-8">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-20 rounded-[10px]" />
          <Skeleton className="h-20 rounded-[10px]" />
          <Skeleton className="h-20 rounded-[10px]" />
        </div>
      </div>
    );
  }

  if (!enquiry) {
    return (
      <div className="p-6 md:p-8 text-center">
        <p className="text-[16px] text-[#4A5553]">Enquiry not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <button
        onClick={() => navigate("/admin/enquiries")}
        className="flex items-center gap-2 text-[14px] text-[#0F3D3E] hover:underline mb-6"
      >
        <ArrowLeft size={16} />
        Back to enquiries
      </button>

      <h1 className="text-[28px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-6">
        {enquiry.guest_name}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#EDE8DC] rounded-[14px] p-6">
            <h2 className="text-[18px] font-semibold text-[#0F3D3E] mb-4">
              Enquiry details
            </h2>
            <div className="space-y-3 text-[16px]">
              <div>
                <span className="text-[#4A5553]">Phone:</span>{" "}
                <span className="text-[#0F3D3E] font-medium">{enquiry.guest_phone}</span>
              </div>
              {enquiry.guest_email && (
                <div>
                  <span className="text-[#4A5553]">Email:</span>{" "}
                  <span className="text-[#0F3D3E] font-medium">{enquiry.guest_email}</span>
                </div>
              )}
              <div>
                <span className="text-[#4A5553]">Room:</span>{" "}
                <span className="text-[#0F3D3E] font-medium">
                  {enquiry.rooms?.name || "Not specified"}
                </span>
              </div>
              <div>
                <span className="text-[#4A5553]">Dates:</span>{" "}
                <span className="text-[#0F3D3E] font-medium">
                  {enquiry.check_in} to {enquiry.check_out}
                </span>
              </div>
              <div>
                <span className="text-[#4A5553]">Guests:</span>{" "}
                <span className="text-[#0F3D3E] font-medium">{enquiry.guests}</span>
              </div>
              {enquiry.message && (
                <div>
                  <span className="text-[#4A5553]">Message:</span>
                  <p className="mt-1 text-[#0F3D3E]">{enquiry.message}</p>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
              Admin notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 rounded-[10px] border border-[#E2DBC9] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#B8893B] resize-none"
              placeholder="Add notes about this enquiry..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <Button onClick={handleSave} size="lg" className="w-full" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>

          <a href={`tel:${enquiry.guest_phone}`} className="block">
            <Button variant="outline" size="lg" className="w-full">
              <Phone size={16} />
              Call guest
            </Button>
          </a>

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="outline" size="lg" className="w-full">
              <MessageCircle size={16} />
              Reply on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
