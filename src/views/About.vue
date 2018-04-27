<template>
  <div class="am-g am-g-fixed blog-fixed">

    <h2 class="profile">个人简介</h2>
    <hr data-am-widget="divider" style="" class="am-divider am-divider-default" />

    <figure data-am-widget="figure" class="am am-figure am-figure-default">  
      <img src="/dist/static/images/icon.png" alt="这里只有诗和远方"/>
    </figure>
    <h3>91年的小叔叔，喜欢看电影，每逢漫威电影上映必看。</h3>
    <h3>喜欢折腾点计算机技术，还老爱吃东西，偶尔带女票下馆子。</h3>
    <h3>喜欢猫猫狗狗，偶尔去宠物市场撸商家的猫狗，老板表示无奈。</h3>
    <h3>11年读行管，自我感觉颓废而又对计算机感兴趣，因而转学计算机。14年毕业于某不知名院校，软件工程专业，上课只带自己的技术书看，被老师称为：从不带对书的人。</h3>

    <h2 class="profile">技术栈</h2>
    <hr data-am-widget="divider" style="" class="am-divider am-divider-default" />

    <div class="progress_container">
      <p>Java</p>
      <div class="am-progress">
        <div class="am-progress-bar" style="width: 80%">80%</div>
      </div>
    </div>
    <div class="progress_container">
      <p>JavaScript</p>
      <div class="am-progress">
        <div class="am-progress-bar am-progress-bar-secondary" style="width: 65%">65%</div>
      </div>
    </div>
    <div class="progress_container">
      <p>HTML/CSS</p>
      <div class="am-progress">
        <div class="am-progress-bar" style="width: 40%">40%</div>
      </div>
    </div>
    <div class="progress_container">
      <p>Vuejs</p>
      <div class="am-progress">
        <div class="am-progress-bar am-progress-bar-success" style="width: 50%">50%</div>
      </div>
    </div>
    <div class="progress_container">
      <p>MySQL</p>
      <div class="am-progress">
        <div class="am-progress-bar" style="width: 60%">60%</div>
      </div>
    </div>
    <div class="progress_container">
      <p>Redis</p>
      <div class="am-progress">
        <div class="am-progress-bar am-progress-bar-warning" style="width: 50%">50%</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.am-g {
  text-align: center;
}

.profile {
  text-align: left;
  border-left: 3px solid #10D07A;
  padding-left: 0.5em;
}

.am-figure img {
  width: 10rem;
  border-radius: 50%;
}

.am-badge {
  width: 70%;
  margin: 0.3em 0px;
}

.progress_container {
  width: 70%;
  margin: 0 auto;
}
.progress_container p {
  float: left;
  width: 5.5em;
  margin-right: 1em;
  font-weight: bold;
  text-align: right;
}
</style>