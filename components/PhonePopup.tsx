import Image from "next/image";

type PhonePopupProps = {
  isOpen: boolean;
  labels: {
    ariaLabel: string;
    call: string;
    close: string;
    subtitle: string;
    title: string;
  };
  phone: string;
  onClose: () => void;
};

export function PhonePopup({ isOpen, labels, phone, onClose }: PhonePopupProps) {
  if (!isOpen) return null;

  return (
    <div className="popup-backdrop" onClick={onClose}>
      <div className="popup" role="dialog" aria-modal="true" aria-label={labels.ariaLabel} onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <div className="popup-icon-wrap">
            <Image src="/icons/whiteTelephone.png" alt="" aria-hidden="true" width={20} height={20} style={{ opacity: 0.9 }} />
          </div>
          <div>
            <p className="popup-title">{labels.title}</p>
            <p className="popup-subtitle">{labels.subtitle}</p>
          </div>
        </div>
        <div className="popup-body">
          <p className="popup-number">{phone}</p>
          <div className="popup-actions">
            <a className="btn-call" href={`tel:${phone.replace(/\s+/g, "")}`}>
              {labels.call}
            </a>
            <button className="btn-dismiss" type="button" onClick={onClose}>
              {labels.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
