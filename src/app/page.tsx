import { Section, Container } from '@/components/layout';
import { Button, Card } from '@/components/ui';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <Section centered tight>
        <Container centered>
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-display text-neutral-900 animate-fade-in">
              Your Peaceful Journey
              <br />
              <span className="text-primary-500">Starts Here</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto animate-slide-up">
              A modern platform that helps expecting parents create personalized baby essentials checklists with confidence and calm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Button size="lg" className="w-full sm:w-auto">
                Start Planning
              </Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section id="features">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-neutral-900 mb-4">
              Designed for Peace of Mind
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Everything you need to prepare for your new arrival, organized simply and beautifully.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center space-y-4 hover-lift">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v5.586a1 1 0 00.707.293l5.414 5.414a1 1 0 00.293.707L19.586 9H17" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11H7a2 2 0 00-2 2v5.586a1 1 0 00.707.293l5.414 5.414a1 1 0 00.293.707L19.586 15H17" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Smart Checklists
              </h3>
              <p className="text-neutral-600">
                Personalized recommendations based on your due date and preferences.
              </p>
            </Card>

            <Card className="text-center space-y-4 hover-lift">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3l3 3m0-4l-3-3m6 0l-3 3" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18m-9-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Expert Guidance
              </h3>
              <p className="text-neutral-600">
                Trusted advice from pediatric experts and experienced parents.
              </p>
            </Card>

            <Card className="text-center space-y-4 hover-lift">
              <div className="w-16 h-16 bg-success-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 4l2-2m-6 4l2-2m-6 4l2-2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1-.448-1-1-1zm0 2v6m0-4V8m0 4h.01M12 8v.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Stress-Free Planning
              </h3>
              <p className="text-neutral-600">
                Reduce decision fatigue with our organized, calming approach.
              </p>
            </Card>
          </div>
        </Container>
      </Section>
    </div>
  );
}
