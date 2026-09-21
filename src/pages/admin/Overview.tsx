import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchStats, fetchRecentEnquiries } from "@/lib/adminApi";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Bed, CheckCircle } from "lucide-react";

export default function AdminOverview() {
  const [stats, setStats] = useState<{
    totalRooms: number;
    availableRooms: number;
    newEnquiries: number;
  } | null>(null);
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, enquiriesData] = await Promise.all([
        fetchStats(),
        fetchRecentEnquiries(5),
      ]);
      setStats(statsData);
      setRecentEnquiries(enquiriesData);
    } catch (error) {
      console.error("Error loading overview:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-[28px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-6">
        Overview
      </h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {loading ? (
          <>
            <Skeleton className="h-24 rounded-[14px]" />
            <Skeleton className="h-24 rounded-[14px]" />
            <Skeleton className="h-24 rounded-[14px]" />
          </>
        ) : (
          <>
            <div className="bg-[#EDE8DC] rounded-[14px] p-6">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare size={20} className="text-[#B8893B]" />
                <span className="text-[14px] text-[#4A5553]">New enquiries (7 days)</span>
              </div>
              <p className="text-[32px] font-[Fraunces] font-semibold text-[#0F3D3E]">
                {stats?.newEnquiries || 0}
              </p>
            </div>

            <div className="bg-[#EDE8DC] rounded-[14px] p-6">
              <div className="flex items-center gap-3 mb-2">
                <Bed size={20} className="text-[#B8893B]" />
                <span className="text-[14px] text-[#4A5553]">Total rooms</span>
              </div>
              <p className="text-[32px] font-[Fraunces] font-semibold text-[#0F3D3E]">
                {stats?.totalRooms || 0}
              </p>
            </div>

            <div className="bg-[#EDE8DC] rounded-[14px] p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle size={20} className="text-[#2F7D5B]" />
                <span className="text-[14px] text-[#4A5553]">Available rooms</span>
              </div>
              <p className="text-[32px] font-[Fraunces] font-semibold text-[#0F3D3E]">
                {stats?.availableRooms || 0}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Recent enquiries */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[22px] font-[Fraunces] font-semibold text-[#0F3D3E]">
            Recent enquiries
          </h2>
          <Link
            to="/admin/enquiries"
            className="text-[14px] text-[#0F3D3E] hover:underline"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 rounded-[10px]" />
            ))}
          </div>
        ) : recentEnquiries.length === 0 ? (
          <div className="text-center py-12 bg-[#EDE8DC] rounded-[14px]">
            <p className="text-[16px] text-[#4A5553]">No enquiries yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentEnquiries.map((enquiry: any) => (
              <Link
                key={enquiry.id}
                to={`/admin/enquiries/${enquiry.id}`}
                className="block bg-white border border-[#E2DBC9] rounded-[10px] p-4 hover:border-[#0F3D3E] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[16px] font-medium text-[#0F3D3E]">
                    {enquiry.guest_name}
                  </p>
                  <span className="text-[12px] text-[#4A5553]">
                    {new Date(enquiry.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[14px] text-[#4A5553]">
                  <span>{enquiry.rooms?.name || "No room selected"}</span>
                  <span>·</span>
                  <span>
                    {enquiry.check_in} to {enquiry.check_out}
                  </span>
                  <span>·</span>
                  <span className="capitalize px-2 py-0.5 rounded-full bg-[#EDE8DC] text-[12px]">
                    {enquiry.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
