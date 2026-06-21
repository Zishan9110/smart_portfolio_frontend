import { useSelector } from 'react-redux';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiCode, FiArrowUp } from 'react-icons/fi';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';

const SOCIAL_ICON_MAP = {
  github: FiGithub,
  linkedin: FiLinkedin,
  leetcode: SiLeetcode,
  geeksforgeeks: SiGeeksforgeeks,
  twitter: FiTwitter,
  instagram: FiInstagram,
};

export default function Footer() {
  const profile = useSelector((state) => state.profile.data);
  const year = new Date().getFullYear();

  const socialLinks = profile?.socialLinks || {};
  const activeSocials = Object.entries(socialLinks).filter(([, url]) => url);

  return (
    <footer className="relative border-t border-white/[0.06] mt-32">
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-ink-muted text-sm">
            <FiCode className="text-accent-cyan" />
            <span>
              Built with the MERN stack · &copy; {year} {profile?.name || 'Portfolio'}
            </span>
          </div>

          {activeSocials.length > 0 && (
            <div className="flex items-center gap-3">
              {activeSocials.map(([key, url]) => {
                const Icon = SOCIAL_ICON_MAP[key];
                if (!Icon) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 flex items-center justify-center rounded-full glass-card text-ink-muted hover:text-ink"
                    aria-label={key}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          )}

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="h-10 w-10 flex items-center justify-center rounded-full glass-card text-ink-muted hover:text-ink"
            aria-label="Back to top"
          >
            <FiArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
