import { createContext, useContext, useState, type ReactNode } from "react";
import { EnquiryDialog } from "@/components/EnquiryDialog";

interface EnquiryDialogContextType {
  openEnquiryDialog: (roomSlug?: string) => void;
}

const EnquiryDialogContext = createContext<EnquiryDialogContextType | undefined>(
  undefined
);

export function EnquiryDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedRoomSlug, setPreselectedRoomSlug] = useState<
    string | undefined
  >(undefined);

  const openEnquiryDialog = (roomSlug?: string) => {
    setPreselectedRoomSlug(roomSlug);
    setIsOpen(true);
  };

  const closeEnquiryDialog = () => {
    setIsOpen(false);
    setPreselectedRoomSlug(undefined);
  };

  return (
    <EnquiryDialogContext.Provider value={{ openEnquiryDialog }}>
      {children}
      <EnquiryDialog
        isOpen={isOpen}
        onClose={closeEnquiryDialog}
        preselectedRoomSlug={preselectedRoomSlug}
      />
    </EnquiryDialogContext.Provider>
  );
}

export function useEnquiryDialog() {
  const context = useContext(EnquiryDialogContext);
  if (!context) {
    throw new Error(
      "useEnquiryDialog must be used within an EnquiryDialogProvider"
    );
  }
  return context;
}
