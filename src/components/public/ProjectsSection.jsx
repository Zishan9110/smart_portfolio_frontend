import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiSearch, FiFolder } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import EmptyState from '../common/EmptyState';
import Spinner from '../common/Spinner';
import ProjectCard from './ProjectCard';
import { fetchProjects, setFilters } from '../../features/projects/projectsSlice';

export default function ProjectsSection() {
  const dispatch = useDispatch();
  const { items, status, filters, pages } = useSelector((state) => state.projects);
  const [searchInput, setSearchInput] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    dispatch(fetchProjects({ ...filters, limit: 9 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filters]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setFilters({ search: searchInput, page: 1 }));
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const categories = [...new Set(items.map((p) => p.category).filter(Boolean))];

  const handleCategoryClick = (cat) => {
    const next = activeCategory === cat ? '' : cat;
    setActiveCategory(next);
    dispatch(setFilters({ category: next }));
  };

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading
          eyebrow="Work"
          title="Selected projects"
          description="A collection of things I've built — from full-stack platforms to focused tools."
        />

        <div className="flex flex-col sm:flex-row gap-3 mb-10 items-stretch sm:items-center justify-between">
          <div className="relative max-w-sm w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" size={16} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search projects..."
              className="input-field !pl-10 !py-2.5 text-sm"
            />
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs border transition-colors ${
                    activeCategory === cat
                      ? 'bg-gradient-accent border-transparent text-white'
                      : 'border-white/10 text-ink-muted hover:text-ink hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {status === 'loading' && items.length === 0 ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon={FiFolder}
            title="No projects found"
            message="Try a different search term or check back soon for new work."
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((project, idx) => (
              <ProjectCard key={project._id} project={project} index={idx} />
            ))}
          </div>
        )}

        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: pages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => dispatch(setFilters({ page: pageNum }))}
                className={`h-9 w-9 rounded-full text-sm transition-colors ${
                  filters.page === pageNum
                    ? 'bg-gradient-accent text-white'
                    : 'glass-card text-ink-muted hover:text-ink'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
