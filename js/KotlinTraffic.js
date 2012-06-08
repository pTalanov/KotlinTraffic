(function(){
  'use strict';
  var classes = function(){
    var tmp$0 = Kotlin.createClass({initialize:function(x, y){
      this.$x = x;
      this.$y = y;
    }
    , get_x:function(){
      return this.$x;
    }
    , get_y:function(){
      return this.$y;
    }
    , plus:function(v){
      {
        return traffic.v(this.get_x() + v.get_x(), this.get_y() + v.get_y());
      }
    }
    , minus:function(){
      {
        return traffic.v(-this.get_x(), -this.get_y());
      }
    }
    , minus$0:function(v){
      {
        return traffic.v(this.get_x() - v.get_x(), this.get_y() - v.get_y());
      }
    }
    , times:function(koef){
      {
        return traffic.v(this.get_x() * koef, this.get_y() * koef);
      }
    }
    , distanceTo:function(v){
      {
        return Math.sqrt(this.minus$0(v).get_sqr());
      }
    }
    , rotatedBy:function(theta){
      {
        var sin = Math.sin(theta);
        var cos = Math.cos(theta);
        return traffic.v(this.get_x() * cos - this.get_y() * sin, this.get_x() * sin + this.get_y() * cos);
      }
    }
    , isInRect:function(topLeft, size){
      {
        return (new Kotlin.NumberRange(topLeft.get_x(), topLeft.get_x() + size.get_x() - topLeft.get_x() + 1, false)).contains(this.get_x()) && (new Kotlin.NumberRange(topLeft.get_y(), topLeft.get_y() + size.get_y() - topLeft.get_y() + 1, false)).contains(this.get_y());
      }
    }
    , get_sqr:function(){
      {
        return this.get_x() * this.get_x() + this.get_y() * this.get_y();
      }
    }
    , get_normalized:function(){
      {
        return this.times(1 / Math.sqrt(this.get_sqr()));
      }
    }
    });
    var tmp$1 = Kotlin.createClass({initialize:function(){
    }
    , draw:function(state){
    }
    , get_pos:function(){
      return this.$pos_0;
    }
    , set_pos:function(tmp$0){
      this.$pos_0 = tmp$0;
    }
    });
    var tmp$2 = Kotlin.createClass(tmp$1, {initialize:function(pos){
      this.$pos = pos;
      this.super_init();
      this.$relSize = 0.8;
      this.$imageSize = traffic.v(420, 323);
      this.$size = this.get_imageSize().times(this.get_relSize());
    }
    , get_pos:function(){
      return this.$pos;
    }
    , set_pos:function(tmp$0){
      this.$pos = tmp$0;
    }
    , get_relSize:function(){
      return this.$relSize;
    }
    , get_imageSize:function(){
      return this.$imageSize;
    }
    , get_size:function(){
      return this.$size;
    }
    , draw:function(state){
      {
        state.get_context().drawImage(traffic.loadImage(traffic.get_PATH_TO_IMAGES() + 'crossroads.jpg'), 0, 0, this.get_imageSize().get_x(), this.get_imageSize().get_y(), this.get_pos().get_x(), this.get_pos().get_y(), this.get_size().get_x(), this.get_size().get_y());
      }
    }
    });
    var tmp$3 = Kotlin.createClass(tmp$1, {initialize:function(){
      this.super_init();
      this.$pos = new traffic.Vector(4, 4);
    }
    , get_pos:function(){
      return this.$pos;
    }
    , set_pos:function(tmp$0){
      this.$pos = tmp$0;
    }
    , draw:function(state){
      {
        state.get_context().fillStyle = traffic.get_Colors().get_white();
        state.get_context().fillRect(2, 4, 10, 292);
        state.get_context().fillRect(330, 4, 370, 292);
        state.get_context().fillRect(2, 2, 330, 10);
        state.get_context().fillRect(4, 265, 340, 380);
        state.get_context().strokeStyle = traffic.get_Colors().get_black();
        state.get_context().lineWidth = 4;
        state.get_context().strokeRect(0, 0, state.get_width(), state.get_height());
      }
    }
    });
    var tmp$4 = Kotlin.createClass(tmp$1, {initialize:function(pos, direction, color){
      this.$pos = pos;
      this.$direction = direction;
      this.$color = color;
      this.super_init();
      this.$imageSize = traffic.v(25, 59);
      this.$speed = traffic.getRandomArbitary(2, 10);
      this.$image = traffic.loadImage(traffic.get_PATH_TO_IMAGES() + this.get_color() + '_car.png');
    }
    , get_pos:function(){
      return this.$pos;
    }
    , set_pos:function(tmp$0){
      this.$pos = tmp$0;
    }
    , get_direction:function(){
      return this.$direction;
    }
    , get_color:function(){
      return this.$color;
    }
    , get_imageSize:function(){
      return this.$imageSize;
    }
    , get_speed:function(){
      return this.$speed;
    }
    , set_speed:function(tmp$0){
      this.$speed = tmp$0;
    }
    , get_image:function(){
      return this.$image;
    }
    , draw:function(state){
      {
        if (this.get_direction() == 'up' || this.get_direction() == 'down') {
          state.get_context().drawImage(this.get_image(), 0, 0, this.get_imageSize().get_x(), this.get_imageSize().get_y(), this.get_pos().get_x(), this.get_pos().get_y(), this.get_imageSize().get_x(), this.get_imageSize().get_y());
          this.tryMove(state.get_trafficLightUp());
        }
         else {
          state.get_context().drawImage(this.get_image(), 0, 0, this.get_imageSize().get_y(), this.get_imageSize().get_x(), this.get_pos().get_x(), this.get_pos().get_y(), this.get_imageSize().get_y(), this.get_imageSize().get_x());
          this.tryMove(state.get_trafficLightLeft());
        }
      }
    }
    , tryMove:function(lightToCheck){
      {
        if (!this.isNearStopLine() || lightToCheck.canMove() && this.isNearStopLine()) {
          this.move();
        }
         else {
          this.set_speed(traffic.getRandomArbitary(2, 10));
        }
      }
    }
    , isNearStopLine:function(){
      {
        var tmp$0;
        var tmp$1;
        for (tmp$0 = 0; tmp$0 < 5; ++tmp$0) {
          if (tmp$0 == 0)
            if (this.get_direction() == 'up') {
              return this.get_pos().get_y() > 198 && this.get_pos().get_y() < 208;
              break;
            }
          if (tmp$0 == 1)
            if (this.get_direction() == 'down') {
              return this.get_pos().get_y() > 10 && this.get_pos().get_y() < 20;
              break;
            }
          if (tmp$0 == 2)
            if (this.get_direction() == 'right') {
              return this.get_pos().get_x() > -8 && this.get_pos().get_x() < 2;
              break;
            }
          if (tmp$0 == 3)
            if (this.get_direction() == 'left') {
              return this.get_pos().get_x() > 243 && this.get_pos().get_x() < 253;
              break;
            }
          if (tmp$0 == 4)
            return false;
        }
        tmp$1;
      }
    }
    , move:function(){
      {
        var x = this.get_pos().get_x();
        var y = this.get_pos().get_y();
        var tmp$0;
        var tmp$1;
        for (tmp$0 = 0; tmp$0 < 5; ++tmp$0) {
          if (tmp$0 == 0)
            if (this.get_direction() == 'up') {
              if (this.get_pos().get_y() < -50)
                tmp$1 = y = 250;
              else 
                tmp$1 = y = this.get_pos().get_y() - this.get_speed();
              break;
            }
          if (tmp$0 == 1)
            if (this.get_direction() == 'down') {
              if (this.get_pos().get_y() > 300)
                tmp$1 = y = 0;
              else 
                tmp$1 = y = this.get_pos().get_y() + this.get_speed();
              break;
            }
          if (tmp$0 == 2)
            if (this.get_direction() == 'right') {
              if (this.get_pos().get_x() > 300)
                tmp$1 = x = -10;
              else 
                tmp$1 = x = this.get_pos().get_x() + this.get_speed();
              break;
            }
          if (tmp$0 == 3)
            if (this.get_direction() == 'left') {
              if (this.get_pos().get_x() < -50)
                tmp$1 = x = 340;
              else 
                tmp$1 = x = this.get_pos().get_x() - this.get_speed();
              break;
            }
          if (tmp$0 == 4) {
          }
        }
        tmp$1;
        this.set_pos(traffic.v(x, y));
      }
    }
    });
    var tmp$5 = Kotlin.createClass(tmp$1, {initialize:function(src, pos, imageSize){
      this.$src = src;
      this.$pos = pos;
      this.$imageSize = imageSize;
      this.super_init();
    }
    , get_src:function(){
      return this.$src;
    }
    , get_pos:function(){
      return this.$pos;
    }
    , set_pos:function(tmp$0){
      this.$pos = tmp$0;
    }
    , get_imageSize:function(){
      return this.$imageSize;
    }
    , draw:function(state){
      {
        state.get_context().drawImage(traffic.loadImage(this.get_src()), 0, 0, this.get_imageSize().get_x(), this.get_imageSize().get_y(), this.get_pos().get_x(), this.get_pos().get_y(), this.get_imageSize().get_x(), this.get_imageSize().get_y());
      }
    }
    , contains:function(mousePos){
      {
        return mousePos.isInRect(this.get_pos(), this.get_imageSize());
      }
    }
    });
    var tmp$6 = Kotlin.createClass(tmp$1, {initialize:function(pos, direction, startColor){
      this.$pos = pos;
      this.$direction = direction;
      this.$startColor = startColor;
      this.super_init();
      this.$red = new traffic.TrafficLightItem(traffic.v(this.get_pos().get_x(), this.get_pos().get_y()), traffic.get_PATH_TO_IMAGES() + 'red_color.png');
      this.$yellow = new traffic.TrafficLightItem(traffic.v(this.get_pos().get_x(), this.get_pos().get_y()), traffic.get_PATH_TO_IMAGES() + 'yellow_color.png');
      this.$green = new traffic.TrafficLightItem(traffic.v(this.get_pos().get_x(), this.get_pos().get_y()), traffic.get_PATH_TO_IMAGES() + 'green_color.png');
      this.$flashingGreen = new traffic.FlashingTrafficLightItem(traffic.v(this.get_pos().get_x(), this.get_pos().get_y()), traffic.get_PATH_TO_IMAGES() + 'green_color.png');
      this.$size = new traffic.Vector(27, 34);
      this.$timer = new traffic.Timer(new traffic.Vector(this.get_pos().get_x() + 6, this.get_pos().get_y() + 12));
      this.$currentColor = this.get_startColor();
      this.$changeColorForward = this.get_startColor() == 'red';
    }
    , get_pos:function(){
      return this.$pos;
    }
    , set_pos:function(tmp$0){
      this.$pos = tmp$0;
    }
    , get_direction:function(){
      return this.$direction;
    }
    , get_startColor:function(){
      return this.$startColor;
    }
    , get_red:function(){
      return this.$red;
    }
    , get_yellow:function(){
      return this.$yellow;
    }
    , get_green:function(){
      return this.$green;
    }
    , get_flashingGreen:function(){
      return this.$flashingGreen;
    }
    , get_size:function(){
      return this.$size;
    }
    , set_size:function(tmp$0){
      this.$size = tmp$0;
    }
    , get_timer:function(){
      return this.$timer;
    }
    , set_timer:function(tmp$0){
      this.$timer = tmp$0;
    }
    , get_currentColor:function(){
      return this.$currentColor;
    }
    , set_currentColor:function(tmp$0){
      this.$currentColor = tmp$0;
    }
    , get_changeColorForward:function(){
      return this.$changeColorForward;
    }
    , set_changeColorForward:function(tmp$0){
      this.$changeColorForward = tmp$0;
    }
    , draw:function(state){
      {
        var tmp$0;
        var tmp$1;
        for (tmp$0 = 0; tmp$0 < 5; ++tmp$0) {
          if (tmp$0 == 0)
            if (this.get_currentColor() == 'red') {
              tmp$1 = this.get_red().draw(state);
              break;
            }
          if (tmp$0 == 1)
            if (this.get_currentColor() == 'yellow') {
              tmp$1 = this.get_yellow().draw(state);
              break;
            }
          if (tmp$0 == 2)
            if (this.get_currentColor() == 'green') {
              tmp$1 = this.get_green().draw(state);
              break;
            }
          if (tmp$0 == 3)
            if (this.get_currentColor() == 'green_flash') {
              tmp$1 = this.get_flashingGreen().draw(state);
              break;
            }
          if (tmp$0 == 4) {
          }
        }
        tmp$1;
        this.get_timer().draw(state);
      }
    }
    , setRed:function(){
      {
        if (this.get_currentColor() == 'green') {
          this.changeColor(true);
        }
      }
    }
    , setGreen:function(){
      {
        if (this.get_currentColor() == 'red') {
          this.changeColor(true);
        }
      }
    }
    , changeColor:function(forced){
      {
        if (this.get_changeColorForward())
          this.changeColorForward(forced);
        else 
          this.changeColorBackward(forced);
      }
    }
    , changeColorForward:function(forced){
      {
        this.set_changeColorForward(false);
        this.set_currentColor('yellow');
        var tmp$0;
        window.setTimeout((tmp$0 = this , function(){
          {
            if (!forced) {
              tmp$0.get_timer().resetTimer();
            }
            tmp$0.set_currentColor('green');
          }
        }
        ), 3000);
      }
    }
    , changeColorBackward:function(forced){
      {
        this.set_changeColorForward(true);
        this.set_currentColor('green_flash');
        var tmp$0_0;
        window.setTimeout((tmp$0_0 = this , function(){
          {
            tmp$0_0.set_currentColor('yellow');
            var tmp$0;
            window.setTimeout((tmp$0 = tmp$0_0 , function(){
              {
                if (!forced) {
                  tmp$0.get_timer().resetTimer();
                }
                tmp$0.set_currentColor('red');
              }
            }
            ), 1000);
          }
        }
        ), 2000);
      }
    }
    , canMove:function(){
      {
        return this.get_currentColor() != 'red' && this.get_currentColor() != 'yellow';
      }
    }
    });
    var tmp$7 = Kotlin.createClass(tmp$1, {initialize:function(src, pos, size, isHorizontal){
      this.$src = src;
      this.$pos = pos;
      this.$size = size;
      this.$isHorizontal = isHorizontal;
      this.super_init();
      this.$isMouseOver = false;
      this.$isMouseDown = false;
      this.$image = traffic.loadImage(this.get_src());
    }
    , get_src:function(){
      return this.$src;
    }
    , get_pos:function(){
      return this.$pos;
    }
    , set_pos:function(tmp$0){
      this.$pos = tmp$0;
    }
    , get_size:function(){
      return this.$size;
    }
    , get_isHorizontal:function(){
      return this.$isHorizontal;
    }
    , get_isMouseOver:function(){
      return this.$isMouseOver;
    }
    , set_isMouseOver:function(tmp$0){
      this.$isMouseOver = tmp$0;
    }
    , get_isMouseDown:function(){
      return this.$isMouseDown;
    }
    , set_isMouseDown:function(tmp$0){
      this.$isMouseDown = tmp$0;
    }
    , get_image:function(){
      return this.$image;
    }
    , draw:function(state){
      {
        if (this.get_isMouseOver()) {
          var tmp$0;
          traffic.shadowed(state.get_context(), traffic.v(-3, 3), 1.2, (tmp$0 = this , function(){
            {
              tmp$0.drawImage(state);
            }
          }
          ));
        }
         else if (this.get_isMouseDown()) {
          var tmp$1;
          traffic.shadowed(state.get_context(), traffic.v(-3, 3), 0.8, (tmp$1 = this , function(){
            {
              tmp$1.drawImage(state);
            }
          }
          ));
        }
         else {
          this.drawImage(state);
        }
      }
    }
    , mouseClick:function(){
      {
        this.set_isMouseDown(true);
        var tmp$0;
        window.setTimeout((tmp$0 = this , function(){
          {
            tmp$0.set_isMouseDown(false);
          }
        }
        ), 1000);
      }
    }
    , mouseOver:function(){
      {
        this.set_isMouseOver(true);
        var tmp$0;
        window.setTimeout((tmp$0 = this , function(){
          {
            tmp$0.set_isMouseOver(false);
          }
        }
        ), 1000);
      }
    }
    , drawImage:function(state){
      {
        state.get_context().drawImage(traffic.loadImage(this.get_src()), 0, 0, this.get_size().get_x(), this.get_size().get_y(), this.get_pos().get_x(), this.get_pos().get_y(), this.get_size().get_x(), this.get_size().get_y());
      }
    }
    , contains:function(mousePos){
      {
        return mousePos.isInRect(this.get_pos(), this.get_size());
      }
    }
    });
    var tmp$8 = Kotlin.createClass(tmp$1, {initialize:function(pos){
      this.$pos = pos;
      this.super_init();
      this.$timeLeftForChangeColor = 'c';
      this.$timeStartLastChangeColor = (new Date).getTime();
      this.$timerLength = 3;
    }
    , get_pos:function(){
      return this.$pos;
    }
    , set_pos:function(tmp$0){
      this.$pos = tmp$0;
    }
    , get_timeLeftForChangeColor:function(){
      return this.$timeLeftForChangeColor;
    }
    , set_timeLeftForChangeColor:function(tmp$0){
      this.$timeLeftForChangeColor = tmp$0;
    }
    , get_timeStartLastChangeColor:function(){
      return this.$timeStartLastChangeColor;
    }
    , set_timeStartLastChangeColor:function(tmp$0){
      this.$timeStartLastChangeColor = tmp$0;
    }
    , get_timerLength:function(){
      return this.$timerLength;
    }
    , set_timerLength:function(tmp$0){
      this.$timerLength = tmp$0;
    }
    , draw:function(state){
      {
        this.set_timeLeftForChangeColor((this.get_timerLength() - ((new Date).getTime() - this.get_timeStartLastChangeColor()) / 1000 + ' ').charAt(0));
        state.get_context().font = 'bold 9px Arial, serif';
        state.get_context().fillStyle = traffic.get_Colors().get_black();
        state.get_context().fillText(this.get_timeLeftForChangeColor(), this.get_pos().get_x(), this.get_pos().get_y());
      }
    }
    , resetTimer:function(){
      {
        this.set_timeStartLastChangeColor((new Date).getTime());
        this.set_timerLength(10);
      }
    }
    });
    var tmp$9 = Kotlin.createClass(tmp$1, {initialize:function(pos, imageSrc){
      this.$pos = pos;
      this.$imageSrc = imageSrc;
      this.super_init();
      this.$relSize = 0.5;
      this.$imageSize = traffic.v(33, 33);
      this.$size = this.get_imageSize().times(this.get_relSize());
      this.$image = traffic.loadImage(this.get_imageSrc());
    }
    , get_pos:function(){
      return this.$pos;
    }
    , set_pos:function(tmp$0){
      this.$pos = tmp$0;
    }
    , get_imageSrc:function(){
      return this.$imageSrc;
    }
    , get_relSize:function(){
      return this.$relSize;
    }
    , get_imageSize:function(){
      return this.$imageSize;
    }
    , get_size:function(){
      return this.$size;
    }
    , get_image:function(){
      return this.$image;
    }
    , draw:function(state){
      {
        this.drawImage(state, this.get_image());
      }
    }
    , drawImage:function(state, image){
      {
        state.get_context().drawImage(image, 0, 0, this.get_imageSize().get_x(), this.get_imageSize().get_y(), this.get_pos().get_x(), this.get_pos().get_y(), this.get_size().get_x(), this.get_size().get_y());
      }
    }
    });
    var tmp$10 = Kotlin.createClass(tmp$9, {initialize:function(pos, imageSrc){
      this.super_init(pos, imageSrc);
      this.$isFlashingAtTheMoment = false;
      this.$updatesSinceLastStateChange = 0;
    }
    , get_isFlashingAtTheMoment:function(){
      return this.$isFlashingAtTheMoment;
    }
    , set_isFlashingAtTheMoment:function(tmp$0){
      this.$isFlashingAtTheMoment = tmp$0;
    }
    , get_updatesSinceLastStateChange:function(){
      return this.$updatesSinceLastStateChange;
    }
    , set_updatesSinceLastStateChange:function(tmp$0){
      this.$updatesSinceLastStateChange = tmp$0;
    }
    , draw:function(state){
      {
        if (!this.get_isFlashingAtTheMoment()) {
          this.drawImage(state, this.get_image());
        }
        this.updateFlashes();
      }
    }
    , updateFlashes:function(){
      {
        if (this.get_updatesSinceLastStateChange() > 6) {
          this.set_isFlashingAtTheMoment(!this.get_isFlashingAtTheMoment());
          this.set_updatesSinceLastStateChange(0);
        }
         else {
          var tmp$0;
          var tmp$1;
          tmp$0 = this.get_updatesSinceLastStateChange() , (tmp$1 = tmp$0 , (this.set_updatesSinceLastStateChange(tmp$0 + 1) , tmp$1));
        }
      }
    }
    });
    var tmp$11 = Kotlin.createClass({initialize:function(canvas){
      this.$canvas = canvas;
      this.$context = this.get_canvas().getContext('2d') != null?this.get_canvas().getContext('2d'):Kotlin.throwNPE();
      this.$shapes = new Kotlin.ArrayList;
      this.$width = this.get_canvas().width;
      this.$height = this.get_canvas().height;
      this.$trafficLightUp = new traffic.TrafficLight(traffic.v(180, 181), 'up', 'red');
      this.$trafficLightDown = new traffic.TrafficLight(traffic.v(100, 77), 'down', 'red');
      this.$trafficLightLeft = new traffic.TrafficLight(traffic.v(228, 109), 'left', 'green');
      this.$trafficLightRight = new traffic.TrafficLight(traffic.v(55, 145), 'right', 'green');
      {
        this.addShape(new traffic.Map(traffic.v(10, 10)));
        this.addShape(this.get_trafficLightLeft());
        this.addShape(this.get_trafficLightUp());
        this.addShape(this.get_trafficLightDown());
        this.addShape(this.get_trafficLightRight());
        this.addShape(new traffic.Car(traffic.v(178, 205), 'up', 'red'));
        this.addShape(new traffic.Car(traffic.v(95, 4), 'down', 'white'));
        this.addShape(new traffic.Car(traffic.v(278, 108), 'left', 'blue'));
        this.addShape(new traffic.Car(traffic.v(0, 142), 'right', 'black'));
        this.addShape(new traffic.Border);
        this.addShape(new traffic.Controls(traffic.get_PATH_TO_IMAGES() + 'controls.png', traffic.v(380, 10), traffic.v(190, 56)));
        this.addShape(new traffic.Button(traffic.get_PATH_TO_IMAGES() + 'lr.png', traffic.v(420, 70), traffic.v(120, 50), true));
        this.addShape(new traffic.Button(traffic.get_PATH_TO_IMAGES() + 'ud.png', traffic.v(455, 120), traffic.v(50, 120), false));
      }
    }
    , get_canvas:function(){
      return this.$canvas;
    }
    , get_context:function(){
      return this.$context;
    }
    , get_shapes:function(){
      return this.$shapes;
    }
    , get_width:function(){
      return this.$width;
    }
    , get_height:function(){
      return this.$height;
    }
    , get_trafficLightUp:function(){
      return this.$trafficLightUp;
    }
    , get_trafficLightDown:function(){
      return this.$trafficLightDown;
    }
    , get_trafficLightLeft:function(){
      return this.$trafficLightLeft;
    }
    , get_trafficLightRight:function(){
      return this.$trafficLightRight;
    }
    , get_size:function(){
      {
        return traffic.v(this.get_width(), this.get_height());
      }
    }
    , addShape:function(shape){
      {
        this.get_shapes().add(shape);
      }
    }
    , startDrawing:function(){
      {
        var tmp$0_0;
        $(this.get_canvas()).click((tmp$0_0 = this , function(it){
          {
            var mousePos = tmp$0_0.mousePos_0(it);
            var tmp$0;
            {
              tmp$0 = tmp$0_0.get_shapes().iterator();
              while (tmp$0.get_hasNext()) {
                var shape = tmp$0.next();
                {
                  if (Kotlin.isType(shape, traffic.Button) && shape.contains(mousePos)) {
                    shape.mouseClick();
                    if (shape.get_isHorizontal()) {
                      tmp$0_0.get_trafficLightUp().setRed();
                      tmp$0_0.get_trafficLightDown().setRed();
                      tmp$0_0.get_trafficLightLeft().setGreen();
                      tmp$0_0.get_trafficLightRight().setGreen();
                    }
                     else {
                      tmp$0_0.get_trafficLightLeft().setRed();
                      tmp$0_0.get_trafficLightRight().setRed();
                      tmp$0_0.get_trafficLightUp().setGreen();
                      tmp$0_0.get_trafficLightDown().setGreen();
                    }
                  }
                }
              }
            }
          }
        }
        ));
        var tmp$1;
        $(this.get_canvas()).mousemove((tmp$1 = this , function(it){
          {
            var mousePos = tmp$1.mousePos_0(it);
            var tmp$0;
            {
              tmp$0 = tmp$1.get_shapes().iterator();
              while (tmp$0.get_hasNext()) {
                var shape = tmp$0.next();
                {
                  if (Kotlin.isType(shape, traffic.Button) && shape.contains(mousePos)) {
                    shape.mouseOver();
                  }
                }
              }
            }
          }
        }
        ));
        var tmp$2;
        window.setInterval((tmp$2 = this , function(){
          {
            tmp$2.draw();
          }
        }
        ), 1000 / 30);
        var tmp$3;
        window.setInterval((tmp$3 = this , function(){
          {
            tmp$3.changeColors();
          }
        }
        ), 10000);
        this.changeColors();
      }
    }
    , changeColors:function(){
      {
        this.get_trafficLightUp().changeColor(false);
        this.get_trafficLightLeft().changeColor(false);
        this.get_trafficLightRight().changeColor(false);
        this.get_trafficLightDown().changeColor(false);
      }
    }
    , mousePos_0:function(e){
      {
        var offset = new traffic.Vector(0, 0);
        var element = this.get_canvas();
        while (element != null) {
          var el = Kotlin.sure(element);
          offset = offset.plus(new traffic.Vector(el.offsetLeft, el.offsetTop));
          element = el.offsetParent;
        }
        return (new traffic.Vector(e.pageX, e.pageY)).minus$0(offset);
      }
    }
    , draw:function(){
      {
        this.clear();
        var tmp$0;
        {
          tmp$0 = this.get_shapes().iterator();
          while (tmp$0.get_hasNext()) {
            var shape = tmp$0.next();
            {
              shape.draw(this);
            }
          }
        }
      }
    }
    , clear:function(){
      {
        this.get_context().fillStyle = traffic.get_Colors().get_white();
        this.get_context().fillRect(0, 0, this.get_width(), this.get_height());
      }
    }
    });
    return {TrafficLightItem:tmp$9, Controls:tmp$5, TrafficLight:tmp$6, Button:tmp$7, Timer:tmp$8, Shape:tmp$1, Map:tmp$2, Border:tmp$3, Car:tmp$4, CanvasState:tmp$11, FlashingTrafficLightItem:tmp$10, Vector:tmp$0};
  }
  ();
  var kotlin = Kotlin.createNamespace({initialize:function(){
  }
  , set:function(receiver, key, value){
    {
      return receiver.put(key, value);
    }
  }
  }, {browser:Kotlin.createNamespace({initialize:function(){
  }
  }, {})});
  Kotlin.defs.kotlin = kotlin;
  var traffic = Kotlin.createNamespace({initialize:function(){
    this.$Colors = Kotlin.createObject({initialize:function(){
      this.$black = '#000000';
      this.$white = '#FFFFFF';
      this.$grey = '#C0C0C0';
      this.$red = '#EF4137';
      this.$yellow = '#FCE013';
      this.$green = '#0E9648';
    }
    , get_black:function(){
      return this.$black;
    }
    , get_white:function(){
      return this.$white;
    }
    , get_grey:function(){
      return this.$grey;
    }
    , get_red:function(){
      return this.$red;
    }
    , get_yellow:function(){
      return this.$yellow;
    }
    , get_green:function(){
      return this.$green;
    }
    });
    this.$PATH_TO_IMAGES = 'http://kotlin-demo.jetbrains.com/static/images/canvas/';
  }
  , get_Colors:function(){
    return this.$Colors;
  }
  , getRandomArbitary:function(min, max){
    {
      return Math.random() * (max - min) + min;
    }
  }
  , loadImage:function(path){
    {
      var image = window.document.createElement('img');
      image.src = path;
      return image;
    }
  }
  , shadowed:function(receiver, shadowOffset, alpha, render){
    {
      receiver.save();
      receiver.shadowColor = 'rgba(100, 100, 100, ' + alpha + ')';
      receiver.shadowBlur = 5;
      receiver.shadowOffsetX = shadowOffset.get_x();
      receiver.shadowOffsetY = shadowOffset.get_y();
      render.call(receiver);
      receiver.restore();
    }
  }
  , get_PATH_TO_IMAGES:function(){
    return this.$PATH_TO_IMAGES;
  }
  , main:function(args){
    {
      var canvas = window.document.getElementsByTagName('canvas').item(0) != null?window.document.getElementsByTagName('canvas').item(0):Kotlin.throwNPE();
      (new traffic.CanvasState(canvas)).startDrawing();
    }
  }
  , v:function(x, y){
    {
      return new traffic.Vector(x, y);
    }
  }
  }, {TrafficLightItem:classes.TrafficLightItem, Timer:classes.Timer, CanvasState:classes.CanvasState, FlashingTrafficLightItem:classes.FlashingTrafficLightItem, Button:classes.Button, TrafficLight:classes.TrafficLight, Shape:classes.Shape, Controls:classes.Controls, Car:classes.Car, Border:classes.Border, Vector:classes.Vector, Map:classes.Map});
  Kotlin.defs.traffic = traffic;
  kotlin.initialize();
  traffic.initialize();
}
)();

