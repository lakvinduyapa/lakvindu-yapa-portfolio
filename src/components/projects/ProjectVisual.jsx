function normalizeScreenshot(screenshot, projectName) {
  if (typeof screenshot === 'string') {
    return { src: screenshot, alt: `${projectName} interface` }
  }

  return screenshot
}

export default function ProjectVisual({ project, index }) {
  const screenshot = project.screenshots[0]
    ? normalizeScreenshot(project.screenshots[0], project.name)
    : null

  return (
    <div
      className={`project-visual project-visual--${project.visual}${screenshot ? ' project-visual--has-image' : ''}`}
      style={{ '--project-tone': project.tone }}
    >
      {screenshot ? (
        <img
          className="project-visual__image"
          src={screenshot.src}
          alt={screenshot.alt}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      ) : (
        <div className="project-art" aria-hidden="true">
          <div className="project-art__top micro">
            <span>PROJECT / {String(index + 1).padStart(2, '0')}</span>
            <span>{project.status.toUpperCase()}</span>
          </div>
          <div className="project-art__core"><span /><i /><b /></div>
          <div className="project-art__title">{project.name}</div>
          <div className="project-art__role micro">{project.role}</div>
        </div>
      )}
      <div className="project-visual__glow" aria-hidden="true" />
    </div>
  )
}
