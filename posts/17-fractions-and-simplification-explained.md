
    title: "Fractions and simplification, explained"
    permalink: '17-fractions-and-simplification-explained'
    date: {m: 7, d: 1, y: 2017}
    categories:
    - 'text'

---

# Fractions and simplification, explained

I've always found fractions to be a little bit magical; things like "doing the
same multiplication to the numerator and denominator gets you a fraction of
equal value" and the process of simplifying fractions have been useful, but it
hasn't been very clear *how* they work. So in this I set out on the silly,
little, but fun quest to do define the way fractions work using plain old
math..

---

A *fraction* is sort of like a number made of two parts. For example, we might
have a fraction made of the numbers 1 and 2, and we would write that as
<code class='math' id='math-frac-1_2'>\frac{1}{2}</code>. We could have another
fraction made of the numbers 7 and 9, and that would be written as
<code class='math' id='math-frac-7_9'>\frac{7}{9}</code>.

The *value* of a fraction is simply the fraction's top number (we call this its
*numerator*) divided by its bottom number (the *denominator*):
<code class='math' id='math-fracval-9_3'>\frac{9}{3} = 9 \div 3 = 3</code>,
<code class='math' id='math-fracval-100_20'>\frac{100}{20} = 100 \div 20 = 5
</code>,
and so on. (To *evaluate* a fraction just means to replace that fraction with
its value.)

---

You can do lots of cool things with fractions, but we're interested in
*multiplying* them.

Hopefully you already know how to multiply two normal numbers - for example,
you should already know that
<code class='math' id='math-mul-3x7'>3 \times 7 = 21</code>,
<code class='math' id='math-mul-2x4'>2 \times 4 = 8</code>, and so on.

Multiplying two fractions is actually pretty simple - we just need to multiply
the two numerators and the two denominators together, and we get another
fraction. For example, to multiply
<code class='math' id='math-multiply-two-fractions-statement'>
  \frac{1}{2} \times \frac{4}{3}
</code>:

<pre class='math' id='math-multiply-two-fractions-solution'>
  \frac{1}{2} \times \frac{4}{3} = \frac{1 \times 4}{2 \times 3} = \frac{4}{6}
</pre>

We can also multiply other fractions:

<pre class='math' id='math-multiply-two-fractions-2'>
  \frac{7}{5} \times \frac{2}{100} = \frac{7 \times 2}{5 \times 100} = \frac{14}{500}
</pre>

<pre class='math' id='math-multiply-two-fractions-3'>
  \frac{4}{6} \times \frac{1}{3} = \frac{4 \times 1}{6 \times 3} = \frac{4}{18}
</pre>

..and so on.

(We've already said that fractions can be made out of two numbers. But we made
the fraction <code class='math'>\frac{1 \times 4}{2 \times 3}</code> above -
how did that work? Well, it makes sense if you think of
<code class='math'>2 \times 3</code> and <code class='math'>1 \times 4</code>
as numbers. In fact you don't need to worry about what those values are (even
though we know them to be 6 and 4); just that they can be used in place of
numbers. If you would like to get very technical, we could say that a fraction
is made of two *expressions*; and an expression is just a number, like 7, or a
calculation, like <code class='math'>6 \times 5</code>.)

---

What if we want to multiply a fraction and a normal whole number?

<pre class='math'>
  \frac{1}{2} \times 4
</pre>

The trick is that you need to turn the whole number into a fraction, somehow.
The fraction we are creating must have an *equal value* to our whole number,
or else we cannot use it in place of that number.

It is true that for any number, dividing that number by 1 does not change it:
<code class='math'>5 \div 1 = 5</code>, <code class='math'>4 \div 1 = 4</code>,
etc. Since we already know that the value of a fraction is gotten by dividing
the numerator by the denominator, we can create a fraction from any division
problem: simply use the first number (5, 4, etc.) as the numerator and the
second number (1) as the denominator.
<code class='math'>5 = \frac{5}{1}</code>,
<code class='math'>4 = \frac{4}{1}</code>, and so on.

Now we know that any number <code class='math'>\times 4</code> is equal to that
same number <code class='math'>\times \frac{4}{1}</code>, so we may put our
<code class='math'>\frac{4}{1}</code> fraction into our calculation:

<pre class='math'>
  \frac{1}{2} \times 4 = \frac{1}{2} \times \frac{4}{1}
</pre>

And we already know how to multiply two fractions:

<pre class='math'>
  \frac{1}{2} \times \frac{4}{1} = \frac{1 \times 4}{2 \times 1} = \frac{4}{2}
</pre>

---

We're almost ready to try out something interesting, but first we need to
understand one more concept - that any number multiplied by 1 is the original
number: <code class='math'>4 \times 1 = 4</code>,
<code class='math'>3 \times 1 = 3</code>,
<code class='math'>999 \times 1 = 999</code>. (We already know this from how
multiplying whole numbers always works, of course.)

We can apply the same concept to fractions using what we now know about
multiplying a fraction by a whole number:

<pre class='math'>
  \frac{4}{7} \times 1 = \frac{4}{7} \times \frac{1}{1} = \frac{4 \times 1}{7 \times 1} = \frac{4}{7}
</pre>

This makes sense because we know that <code class='math'>1 = \frac{1}{1}</code>
(from our rule that for any number, we can make a fraction that is equal to
that number by using it as the numerator of the fraction and 1 as the
denominator).

---

We can proceed now to define another rule: that for any fraction where the
numerator and denominator are the same, the fraction is equal to 1. For
example, <code class='math'>\frac{5}{5} = 1</code>,
<code class='math'>\frac{1}{1} = 1</code>,
<code class='math'>\frac{105}{105} = 1</code>.

This makes sense because we know that any number divided by itself equals 1
(that is, that any number "fits into" itself exactly 1 time). Using our rule
for the value of a fraction, we may write:
<code class='math'>\frac{5}{5} = 5 \div 5 = 1</code>,
<code class='math'>\frac{1}{1} = 1 \div 1 = 1</code>, and so on.

This means that we know how to replace any 1 in our calculations with a
fraction of equal value; let's try that with our "multiplication by 1 equals
itself" rule using a fraction:

<pre class='math'>
  \begin{align*}
    \frac{3}{5} \times 1 &= \frac{3}{5} \\
    \frac{3}{5} \times \frac{2}{2} &= \frac{3}{5} \\
    \frac{3 \times 2}{5 \times 2} &= \frac{3}{5} \\
    \frac{6}{10} &= \frac{3}{5}
  \end{align*}
</pre>

Ah! How peculiar. This reveals that the fraction
<code class='math'>\frac{6}{10}</code> is actually equal
to the fraction <code class='math'>\frac{3}{5}</code>.

In fact, we can multiply any fraction and 1, or an equal value, and get a new
fraction that is equivalent to the first fraction:

<pre class='math'>
  \begin{align*}
    \frac{7}{9} \times 1 &= \frac{7}{9} \\
    \frac{7}{9} \times \frac{3}{3} &= \frac{7}{9} \\
    \frac{7 \times 3}{9 \times 3} &= \frac{7}{9} \\
    \frac{21}{27} &= \frac{7}{9}
  \end{align*}
</pre>

<pre class='math'>
  \begin{align*}
    \frac{4}{3} \times 1 &= \frac{4}{3} \\
    \frac{4}{3} \times \frac{5}{5} &= \frac{4}{3} \\
    \frac{4 \times 5}{3 \times 5} &= \frac{4}{3} \\
    \frac{20}{15} &= \frac{4}{3}
  \end{align*}
</pre>

<pre class='math'>
  \begin{align*}
    \frac{99}{150} \times 1 &= \frac{99}{150} \\
    \frac{99}{150} \times \frac{1}{1} &= \frac{99}{150} \\
    \frac{99 \times 1}{150 \times 1} &= \frac{99}{150} \\
    \frac{99}{150} &= \frac{99}{150}
  \end{align*}
</pre>

<pre class='math'>
  \begin{align*}
    \frac{2}{4} \times 1 &= \frac{2}{4} \\
    \frac{2}{4} \times \frac{2}{2} &= \frac{2}{4} \\
    \frac{2 \times 2}{4 \times 2} &= \frac{2}{4} \\
    \frac{4}{8} &= \frac{2}{4}
  \end{align*}
</pre>

..And so on.

Now - we have already said that for any fraction where the top and bottom are
equal, that fraction is equal to 1. What if we put two equal fractions inside
of our fraction?

<pre class='math'>
  \frac{\frac{3}{9}}{\frac{3}{9}}
</pre>

This is still equal to 1, because the numerator and denominator of the
"big" fraction are equal. (It *is* true that
<code class='math'>\frac{3}{9} = \frac{3}{9}</code>, of course!)

Likewise, fractions such as
<code class='math'>\frac{\frac{1}{2}}{\frac{1}{2}}</code> and
<code class='math'>\frac{\frac{5}{4}}{\frac{5}{4}}</code> are also equal to 1.

---

Now we can use all we've learned so far to try this:

<pre class='math'>
  \begin{align*}
    \frac{8}{4} \times 1 &= \frac{8}{4} \\
    \frac{8}{4} \times \frac{\frac{1}{2}}{\frac{1}{2}} &= \frac{8}{4}
  \end{align*}
</pre>

But how do we multiply those two fractions? Well, we can multiply them exactly
the way we would usually multiply fractions - multiply the two numerators
together and the two denominators together:

<pre class='math'>
  \frac{8}{4} \times \frac{\frac{1}{2}}{\frac{1}{2}} =
  \frac{8 \times \frac{1}{2}}{4 \times \frac{1}{2}}
</pre>

We already know how to multiply a whole number and a fraction together - just
convert the whole number to a fraction by putting the whole number on top and 1
on the bottom:

<pre class='math'>
  \frac{8 \times \frac{1}{2}}{4 \times \frac{1}{2}} =
  \frac{\frac{8}{1} \times \frac{1}{2}}{\frac{4}{1} \times \frac{1}{2}} =
  \frac{\frac{8 \times 1}{1 \times 2}}{\frac{4 \times 1}{1 \times 2}} =
  \frac{\frac{8}{2}}{\frac{4}{2}}
</pre>

We are nearly completed; we may simply insert this fraction back into our
calculation:

<pre class='math'>
  \begin{align*}
    \frac{8}{4} \times \frac{\frac{1}{2}}{\frac{1}{2}} &= \frac{8}{4} \\
    \frac{\frac{8}{2}}{\frac{4}{2}} &= \frac{8}{4}
  \end{align*}
</pre>

In order to actually make this useful, we must evaluate the fractions that are
in the top and bottom of our newly-created "big" fraction:

<pre class='math'>
  \frac{\frac{8}{2}}{\frac{4}{2}} = \frac{8 \div 2}{4 \div 2} = \frac{4}{2}
</pre>

And then we may put this back into our main calculation:

<pre class='math'>
  \begin{align*}
    \frac{\frac{8}{2}}{\frac{4}{2}} &= \frac{8}{4} \\
    \frac{4}{2} &= \frac{8}{4}
  \end{align*}
</pre>

As you can see, we have gone from one fraction, in this case
<code class='math'>\frac{8}{4}</code>, to a fraction of equal value but smaller
numerators and denominators, <code class='math'>\frac{4}{2}</code>. This is
what is known as *simplifying* a fraction.

We can show these are of equal value simply by comparing their values:
<code class='math'>\frac{8}{4} = 8 \div 4 = 2</code>, and
<code class='math'>\frac{4}{2} = 4 \div 2 = 2</code>. We say that because the
fractions have an equal value, we say they are *proportional*.

---

The *greatest common divisor* of two numbers is the greatest whole number you
can divide both numbers by and get two resulting whole numbers. There are
various methods of finding it; we write it with the notation
<code class='math'>\DeclareMathOperator{\gcd}{gcd} \gcd(a, b)</code> (where
<code class='math'>a</code> and <code class='math'>b</code> are whole number
values). For example,
<code class='math'>\DeclareMathOperator{\gcd}{gcd} \gcd(20, 15) = 5</code>
because dividing <code class='math'>20 \div 5 = 4</code> and
<code class='math'>15 \div 5 = 3</code> both get us whole numbers (4 and 3),
and there is no greater number that both 20 and 15 can be divided by to get
whole numbers.

The greatest common factor can be used inside of fraction simplification to
get the "completely" simplified value of any fraction. For example:

<pre class='math'>
  \begin{equation}
  \begin{split}
  \frac{70}{42} &= \frac{70}{42} \times 1 \\
   &= \frac{70}{42} \times \frac{\frac{1}{\gcd(70,42)}}{\frac{1}{\gcd(70,42)}} \\
   &= \frac{70}{42} \times \frac{\frac{1}{14}}{\frac{1}{14}} \\
   &= \frac{70 \times \frac{1}{14}}{42 \times \frac{1}{14}} \\
   &= \frac{5}{3}
  \end{split}
  \end{equation}
</pre>

(I skipped a couple of steps in multiplying the values in the "big" fraction
to keep a focus on the important part, which was applying the greatest common
divisor.)

Another example:

<pre class='math'>
  \begin{equation}
  \begin{split}
  \frac{8}{4} &= \frac{8}{4} \times 1 \\
   &= \frac{8}{4} \times \frac{\frac{1}{\gcd(8,4)}}{\frac{1}{\gcd(8,4)}} \\
   &= \frac{8}{4} \times \frac{\frac{1}{4}}{\frac{1}{4}} \\
   &= \frac{8 \times \frac{1}{4}}{4 \times \frac{1}{4}} \\
   &= \frac{2}{1} \\
   &= 2
  \end{split}
  \end{equation}
</pre>

This time we get the value of <code class='math'>\frac{2}{1}</code>, which is
2, and use that as our simplified value.

---

All of the above can be written in elegant and general algebra-like math.

**Value of a fraction:**

<pre class='math'>
  \frac{a}{b} = a \div b
</pre>

**Fractions from values using denominator 1:**

<pre class='math'>
  n = n \div 1 = \frac{n}{1}
</pre>

**Multiply two fractions:**

<pre class='math'>
  \frac{a}{b} \times \frac{c}{d} = \frac{a \times c}{b \times d}
</pre>

**Multiply a fraction and a value:**

<pre class='math'>
  \frac{a}{b} \times n =
  \frac{a}{b} \times \frac{n}{1} =
  \frac{a \times n}{b \times 1} =
  \frac{a \times n}{b}
</pre>

**Simplify a fraction (completely):**

<pre class='math'>
  \begin{equation}
  \begin{split}
  \frac{a}{b} &= \frac{a}{b} \times 1 \\
   &= \frac{a}{b} \times \frac{1 \div \gcd(a,b)}{1 \div \gcd(a,b)} \\
   &= \frac{a \times 1 \div \gcd(a,b)}{b \times 1 \div \gcd(a,b)} \\
   &= \frac{a \div \gcd(a,b)}{b \div \gcd(a,b)}
  \end{split}
  \end{equation}
</pre>

Alternate:

<pre class='math'>
  \begin{equation}
  \begin{split}
  \frac{a}{b} &= \frac{a}{b} \times 1 \\
   &= \left( \frac{a}{b} \times \frac{\frac{1}{\gcd(a,b)}}{\frac{1}{\gcd(a,b)}} \right) \\
   &= \left( \frac{a \times \frac{1}{\gcd(a,b)}}{b \times \frac{1}{\gcd(a,b)}} \right) \\
   &= \left( \frac{\frac{a}{1} \times \frac{1}{\gcd(a,b)}}{\frac{b}{1} \times \frac{1}{\gcd(a,b)}} \right) \\
   &= \left( \frac{\frac{a \times 1}{1 \times \gcd(a,b)}}{\frac{b \times 1}{1 \times \gcd(a,b)}} \right) \\
   &= \left( \frac{\frac{a}{\gcd(a,b)}}{\frac{b}{\gcd(a,b)}} \right)
  \end{split}
  \end{equation}
</pre>

(The parentheses around each step are only present to clarify the separate
steps; they don't actually mean anything.)
