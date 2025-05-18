// src/pages/Contact.tsx
import Layout from "@/components/Layout";

export default function Contact() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:px-6 lg:py-24 2xl:max-w-[1400px]">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-muted-foreground mb-4">
          We'd love to hear from you! Whether you have feedback, questions, or need support, feel free to reach out.
        </p>

        <div className="space-y-4 text-lg text-muted-foreground">
          <p><strong>Email:</strong> support@targetcv.ai</p>
          <p><strong>Twitter:</strong> <a href="https://twitter.com/targetcv" className="text-blue-600 hover:underline">@targetcv</a></p>
          <p><strong>GitHub:</strong> <a href="https://github.com/yourrepo/targetcv" className="text-blue-600 hover:underline">github.com/yourrepo/targetcv</a></p>
        </div>
      </div>
    </Layout>
  );
}
