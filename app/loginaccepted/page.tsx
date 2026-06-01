export default function LoginAccepted({ name }: { name: string }) {
  return (
    <div className="relative min-h-screen bg-indigo-950 text-white overflow-hidden">
      <img
        src="/file.svg"
        alt="decorative"
        className="absolute top-6 right-6 w-24 h-24 sm:w-32 sm:h-32"
      />

      <main className="flex items-center justify-center min-h-screen px-6">
        <h1 className="text-center text-5xl font-bold">Welcome {name}</h1>
      </main>
    </div>
  );
}
