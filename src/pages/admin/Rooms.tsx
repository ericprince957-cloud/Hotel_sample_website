import { useState, useEffect } from "react";
import { fetchAllRooms, deleteRoom, updateRoom } from "@/lib/adminApi";
import { useToast } from "@/lib/toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { formatNaira } from "@/lib/utils";

export default function AdminRooms() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const data = await fetchAllRooms();
      setRooms(data);
    } catch (error) {
      console.error("Error loading rooms:", error);
      addToast("error", "Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      const result = await updateRoom(id, { is_available: !currentStatus });
      if (result.success) {
        addToast("success", "Room updated");
        loadRooms();
      } else {
        addToast("error", result.error || "Failed to update");
      }
    } catch (error) {
      addToast("error", "Failed to update room");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const result = await deleteRoom(id);
      if (result.success) {
        addToast("success", "Room deleted");
        loadRooms();
      } else {
        addToast("error", result.error || "Failed to delete");
      }
    } catch (error) {
      addToast("error", "Failed to delete room");
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-[Fraunces] font-semibold text-[#0F3D3E]">
          Rooms
        </h1>
        <Button>Add room</Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 rounded-[10px]" />
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-center py-12 bg-[#EDE8DC] rounded-[14px]">
          <p className="text-[16px] text-[#4A5553]">No rooms yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rooms.map((room: any) => (
            <div
              key={room.id}
              className="bg-white border border-[#E2DBC9] rounded-[10px] p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-[16px] font-medium text-[#0F3D3E] mb-1">
                    {room.name}
                  </h3>
                  <p className="text-[14px] text-[#4A5553]">
                    {formatNaira(room.price_per_night)} / night · {room.max_guests} guests
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={room.is_available}
                      onChange={() => handleToggleAvailability(room.id, room.is_available)}
                      className="w-4 h-4"
                    />
                    <span className="text-[14px] text-[#4A5553]">Available</span>
                  </label>
                  <Button variant="ghost" size="icon">
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(room.id, room.name)}
                  >
                    <Trash2 size={16} className="text-[#B3372F]" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
