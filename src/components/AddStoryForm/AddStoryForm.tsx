'use client';

export default function AddStoryForm() {
  return (
    <form>
      <div>
        <label htmlFor="story-image">Обкладинка статті</label>
        <input
          id="story-image"
          name="image"
          type="file"
          accept="image/*"
        />
      </div>

      <div>
        <label htmlFor="story-title">Заголовок</label>
        <input
          id="story-title"
          name="title"
          type="text"
          placeholder="Введіть заголовок історії"
        />
      </div>

      <div>
        <label htmlFor="story-category">Категорія</label>
        <select id="story-category" name="category" defaultValue="">
          <option value="" disabled>
            Категорія
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="story-article">Текст історії</label>
        <textarea
          id="story-article"
          name="article"
          placeholder="Ваша історія тут"
        />
      </div>

      <div>
        <button type="submit" disabled>
          Зберегти
        </button>
        <button type="reset">Відмінити</button>
      </div>
    </form>
  );
}