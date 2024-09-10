import { GithubIcon, LinkedinIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-4 mt-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} {"Rakibul Islam"}. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/irakibul7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/rakibulislam39/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
