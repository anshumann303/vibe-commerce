interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showSlogan?: boolean;
}

export function Logo({ size = 'md', showText = true, showSlogan = false }: LogoProps) {
  const sizeClasses = {
    sm: {
      container: 'flex items-center gap-2',
      icon: 'w-8 h-8 text-lg',
      title: 'text-lg font-bold',
      slogan: 'text-xs'
    },
    md: {
      container: 'flex items-center gap-3',
      icon: 'w-10 h-10 text-xl',
      title: 'text-xl font-bold',
      slogan: 'text-sm'
    },
    lg: {
      container: 'flex flex-col items-center gap-2',
      icon: 'w-16 h-16 text-3xl',
      title: 'text-3xl font-bold',
      slogan: 'text-lg'
    }
  };

  const classes = sizeClasses[size];

  return (
    <div className={classes.container}>
      <div className="flex items-center gap-3">
        {/* Logo Icon */}
        <div className={`${classes.icon} rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold shadow-lg`}>
          V
        </div>
        
        {/* Brand Text */}
        {showText && (
          <div className="flex flex-col">
            <h1 className={`${classes.title} text-primary leading-tight tracking-wide`}>
              VIBE COMMERCE
            </h1>
            {showSlogan && (
              <p className={`${classes.slogan} text-accent font-medium tracking-wide`}>
                Shop Smart. Live Vibrant
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}