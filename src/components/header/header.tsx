import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header class=" ">
      <div class="flex text-center sm:text-left items-center justify-between py-2 px-6 bg-white shadow w-full md:hidden">
        <Link href="/" class=" font-semibold text-xl">Ezaz</Link>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
});
