import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi';
import { fetchProject, clearCurrentProject } from '../../features/projects/projectsSlice';
import Seo from '../../components/common/Seo';
import Spinner from '../../components/common/Spinner';

export default function ProjectDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.current);
  const status = useSelector((state) => state.projects.status);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProject(id));
    window.scrollTo({ top: 0 });
    return () => dispatch(clearCurrentProject());
  }, [dispatch, id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <Seo title={`${project.title} — Project`} description={project.description} />

      <div className="section-container max-w-4xl">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-8">
          <FiArrowLeft /> Back to projects
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {project.images?.length > 0 && (
            <div className="mb-8">
              <div className="aspect-video rounded-2xl overflow-hidden glass-panel mb-3">
                <img
                  src={project.images[activeImage]?.url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {project.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {project.images.map((img, idx) => (
                    <button
                      key={img.public_id}
                      onClick={() => setActiveImage(idx)}
                      className={`h-16 w-24 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                        activeImage === idx ? 'border-accent-indigo' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-display font-bold text-ink mb-3">{project.title}</h1>

          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-ink-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <p className="text-ink-muted leading-relaxed whitespace-pre-line mb-8">{project.description}</p>

          <div className="flex gap-4">
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <FiGithub /> View Code
              </a>
            )}
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <FiExternalLink /> Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
