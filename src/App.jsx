
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

function App() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 py-12 text-foreground">
      <Card className="w-full max-w-2xl rounded-3xl px-8 py-16 sm:px-16 sm:py-24">
        <CardHeader className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
            Hamza Zain
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Hello, world!
          </h1>
          <CardDescription className="mx-auto mt-5 max-w-md text-base leading-7">
            A fresh start for your storefront.
          </CardDescription>
        </CardContent>
      </Card>
    </main>
  )
}

export default App
