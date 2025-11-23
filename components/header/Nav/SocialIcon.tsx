import Link from "next/link";
import { Facebook, Youtube, Instagram, MessageCircle } from "lucide-react";

const SocialIcons: React.FC = () => (
  <div className="flex items-center justify-center space-x-3 text-gray-500">
    <Link
      href="https://www.facebook.com/profile.php?id=61580525746851&rdid=4ZQJckp4cVdkdZxF&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Mqzv3wXUC%2F#"
      aria-label="Facebook"
      className="hover:text-blue-600 transition"
      target="_blank"
    >
      <Facebook size={18} />
    </Link>

    <Link
      href="https://www.youtube.com/@tsbvisionnews"
      aria-label="YouTube"
      className="hover:text-red-600 transition"
      target="_blank"
    >
      <Youtube size={18} />
    </Link>

    <Link
      href="https://www.instagram.com/yourprofile"
      aria-label="Instagram"
      className="hover:text-pink-500 transition"
      target="_blank"
    >
      <Instagram size={18} />
    </Link>

    <Link
      href="https://wa.me/+8801929450836"
      aria-label="WhatsApp"
      className="hover:text-green-600 transition"
      target="_blank"
    >
      <MessageCircle size={18} />
    </Link>
  </div>
);

export default SocialIcons;
