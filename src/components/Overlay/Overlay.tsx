interface OverlayProps {
  onClose?: () => void;
}

export const Overlay = ({ onClose }: OverlayProps) => (
  <div className={'portal-overlay'} onClick={onClose} />
);
