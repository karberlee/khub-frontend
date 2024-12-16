<template>
  <div class="global-content home">
    <div class="home-content">
      
      <section class="hero-area">
        <div class="hero-title">KHub</div>
        <div class="hero-description">All greatness begins with a brave beginning</div>
        <div class="hero-button">Get Started</div>
      </section>

      <section class="feature-area">
        <h2>Our Amazing Features</h2>
        <div class="feature-content">
          <div class="feature-item">
            <img class="feature-img" src="/images/samples/006.jpg" alt="Feature 1">
            <h3>Site Module</h3>
            <p>Record the link of any website or application, account and even password (if you want), and make notes on the website to avoid forgetting, support click to jump.</p>
          </div>
          <div class="feature-item">
            <img class="feature-img" src="/images/samples/007.jpg" alt="Feature 2">
            <h3>Note Module</h3>
            <p>Use the sticky note function to record any text type of content, including but not limited to memos, work logs, etc. Set different levels for sticky notes and distinguish them with obvious colors for easy screening.</p>
          </div>
          <div class="feature-item">
            <img class="feature-img" src="/images/samples/008.jpg" alt="Feature 3">
            <h3>Blog Module</h3>
            <p>Write any article, set it to be public or hidden, support Markdown syntax.</p>
          </div>
        </div>
      </section>

      <section class="testimonial-area">
        <h2>What Our Users Say</h2>
        <div class="testimonial-content">
          <div class="testimonial-card">
            <p>"This website has changed the way I work. It's a game-changer!"</p>
            <p>- John Doe</p>
          </div>
          <div class="testimonial-card">
            <p>"Simple, effective, and reliable. I highly recommend it!"</p>
            <p>- Jane Smith</p>
          </div>
        </div>
      </section>

      <section class="cta-area">
        <h2>Explore More Possibilities?</h2>
        <a href="mailto:karber@foxmail.com" class="cta-btn">Contact Us</a>
      </section>

    </div>
  </div>
</template>

<script setup>
  // No script needed for a static home page component
</script>

<style lang="scss" scoped>
/* Home page styles */

.home {
  // margin-top: 5rem;
  // min-height: calc( 100vh - 10rem );
}

.home-content {
  width: 100%;
  // margin-top: 2rem;
  // display: grid;
  // place-items: center;
}

.hero-area {
  width: 100%;
  padding: 4rem 0;
  text-align: center;
  background-color: var(--primary-color);
  color: #ffffff;

  .hero-title {
    font-size: 3rem;
    font-weight: 900;
    margin: 1rem auto;
  }

  .hero-description {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 1rem auto;
  }

  .hero-button {
    width: 10rem;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    font-size: 1.25rem;
    font-weight: 500;
    border-radius: 10px;
    margin: 1rem auto;
    box-shadow: 10px 4px 10px rgba(0, 0, 0, 0.2),
                -10px -4px 10px rgba(255, 255, 255, 1);
    transition: all 0.2s ease-out;

    &:hover {
      cursor: pointer;
      font-size: 1.3rem;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.2),
                  0 0 0 rgba(255, 255, 255, 1),
                  inset 10px 4px 10px rgba(0, 0, 0, 0.1),
                  inset -10px -4px 10px rgba(255, 255, 255, 1);
    }
  }
}

.feature-area {
  padding: 5rem 2rem;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .feature-content {
    display: flex;
    justify-content: space-around;
    text-align: center;
  
    .feature-item {
      width: 30%;
      padding: 1rem;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      h3 {
        font-size: 1.5rem;
        margin: 1rem 0;
      }

      p {
        font-size: 1rem;
        color: #7f8c8d;
      }
    }
  
    .feature-img {
      width: 100%;
    }
  }
}

.testimonial-area {
  background: #ecf0f1;
  padding: 5rem 2rem;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .testimonial-content {
    display: flex;
    justify-content: center;
    gap: 2rem;

    .testimonial-card {
      background: var(--pure-color);
      padding: 2rem;
      width: 45%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    p {
      font-size: 18px;
      font-style: italic;
      color: #34495e;
    }
  }
}

.cta-area {
  text-align: center;
  padding: 5rem 2rem;
  background: var(--primary-color);
  color: #ffffff;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .cta-btn {
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    font-weight: 500;
    border-radius: 10px;
    text-decoration: none;
    color: #ffffff;
    box-shadow: 10px 4px 10px rgba(0, 0, 0, 0.2),
                -10px -4px 10px rgba(255, 255, 255, 1);
    transition: all 0.2s ease-out;

    &:hover {
      cursor: pointer;
      font-size: 1.3rem;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.2),
                  0 0 0 rgba(255, 255, 255, 1),
                  inset 10px 4px 10px rgba(0, 0, 0, 0.1),
                  inset -10px -4px 10px rgba(255, 255, 255, 1);
    }
  }
}

@media (max-width: $tablet-breakpoint) {
  // .home {
  //   background-color: var(--background-color);
  // }
}
</style>
