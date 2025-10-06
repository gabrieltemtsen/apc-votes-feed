import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Mail, MessageCircle } from 'lucide-react'

export default function AboutPage() {
  return (
    <Container className="py-12 max-w-4xl">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            About APC Riders 001
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-time election monitoring for transparent democracy
          </p>
        </div>

        {/* Mission Section */}
        <div className="prose max-w-none">
          <div className="rounded-2xl border bg-card p-8 space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              APC Riders 001 is dedicated to ensuring transparency and accountability 
              in Nigeria&apos;s electoral process. We provide real-time monitoring and 
              reporting of election results from polling units across all 36 states 
              and the Federal Capital Territory.
            </p>
            
            <p className="text-lg leading-relaxed text-muted-foreground">
              Our network of trained agents work tirelessly to collect, verify, and 
              report accurate voting data, helping to build trust in our democratic 
              institutions and ensuring every vote counts.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">What We Do</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg border bg-card p-6 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-apc-blue/10 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-apc-blue" />
              </div>
              <h3 className="font-semibold">Real-time Reporting</h3>
              <p className="text-sm text-muted-foreground">
                Live updates from polling units across Nigeria as results are counted
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-apc-green/10 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-apc-green" />
              </div>
              <h3 className="font-semibold">Data Verification</h3>
              <p className="text-sm text-muted-foreground">
                Multi-tier verification process to ensure accuracy and reliability
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-apc-red/10 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-apc-red" />
              </div>
              <h3 className="font-semibold">Transparency</h3>
              <p className="text-sm text-muted-foreground">
                Open access to verified results with full audit trails
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="rounded-2xl border bg-card p-8 text-center space-y-6">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our work or want to get involved? 
            We&apos;d love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="apc" size="lg" className="gap-2">
              <Mail className="h-5 w-5" />
              Contact via Email
            </Button>
            <Button variant="apcGreen" size="lg" className="gap-2">
              <MessageCircle className="h-5 w-5" />
              WhatsApp Support
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-sm text-muted-foreground border-t pt-8">
          <p>
            APC Riders 001 is an independent election monitoring initiative. 
            Results displayed are for informational purposes and should be 
            verified with official sources.
          </p>
        </div>
      </div>
    </Container>
  )
}