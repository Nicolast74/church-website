export default function KalenderLiturgi() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose max-w-none">
        <h1 className="text-center text-black">Kalender Liturgi</h1>
      </article>

      <div className="mt-8">
        <div className="flex items-center justify-center mb-6">
          <button className="px-4 py-2 bg-gray-200 rounded-lg">&larr;</button>
          <h2 className="text-2xl font-bold mx-4">Februari 2026</h2>
          <button className="px-4 py-2 bg-gray-200 rounded-lg">&rarr;</button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          <div className="font-bold">Min</div>
          <div className="font-bold">Sen</div>
          <div className="font-bold">Sel</div>
          <div className="font-bold">Rab</div>
          <div className="font-bold">Kam</div>
          <div className="font-bold">Jum</div>
          <div className="font-bold">Sab</div>

          {/* Days of the month */}
          <div className="p-2 border rounded-lg">1</div>
          <div className="p-2 border rounded-lg">2</div>
          <div className="p-2 border rounded-lg">3</div>
          <div className="p-2 border rounded-lg">4</div>
          <div className="p-2 border rounded-lg">5</div>
          <div className="p-2 border rounded-lg bg-green-200">6</div>
          <div className="p-2 border rounded-lg">7</div>
          <div className="p-2 border rounded-lg bg-red-200">8</div>
          <div className="p-2 border rounded-lg">9</div>
          <div className="p-2 border rounded-lg">10</div>
          <div className="p-2 border rounded-lg">11</div>
          <div className="p-2 border rounded-lg">12</div>
          <div className="p-2 border rounded-lg">13</div>
          <div className="p-2 border rounded-lg">14</div>
          <div className="p-2 border rounded-lg">15</div>
          <div className="p-2 border rounded-lg">16</div>
          <div className="p-2 border rounded-lg">17</div>
          <div className="p-2 border rounded-lg">18</div>
          <div className="p-2 border rounded-lg">19</div>
          <div className="p-2 border rounded-lg">20</div>
          <div className="p-2 border rounded-lg">21</div>
          <div className="p-2 border rounded-lg">22</div>
          <div className="p-2 border rounded-lg">23</div>
          <div className="p-2 border rounded-lg">24</div>
          <div className="p-2 border rounded-lg">25</div>
          <div className="p-2 border rounded-lg">26</div>
          <div className="p-2 border rounded-lg">27</div>
          <div className="p-2 border rounded-lg">28</div>
        </div>
        <div className="mt-8 p-4 border rounded-lg">
          <h3 className="font-bold">Jumat, 6 Februari 2026</h3>
          <p>Peringatan Wajib St. Paulus Miki dan teman-temannya, Martir</p>
        </div>
      </div>
    </div>
  );
}