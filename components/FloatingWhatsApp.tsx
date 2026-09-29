import { waLink } from '@/content/site';
import { Icon } from './Icon';

export function FloatingWhatsApp({ message = 'Hi Prime Edge, I would like a free study abroad assessment.' }: { message?: string }) {
  return (
    <a className="wa-float pe-btn-wa" href={waLink(message)} target="_blank" rel="noopener" aria-label="Chat with Prime Edge on WhatsApp">
      <Icon name="whatsapp" size={28} />
    </a>
  );
}
