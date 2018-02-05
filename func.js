		var seconds;
		var item20 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
		var item;
		var iNum;
		var score = 0;
		var ans = [];

		$("#counter").html("10");
		function intro () {
			$(".game").hide();
			$(".counter").hide();
			$(".chkScore").hide();
			$(".score").hide();
			$(".logo").show();
		}
		intro();
		function chooseQ (param) {
			item = param;
			$(".chooseNumQ").hide();
			$(".counter").show();
			$(".game").show();
			seconds = 1;
			$(".logo").hide();
			display();
		}
		function rand () {
			var k;
			let itNum;
			if (item>0) {
				item-- ;
				k = Math.floor(Math.random() * item20.length);
				itNum = item20[k];
				item20.splice(k, 1);
				console.log(k);
				console.log(item20[k]);
				console.log(item20);
			}
			return itNum;
		}
		function display(){
		    seconds-=1;
		if(seconds==0 && item>0){
		 	seconds = 10;
		 	runQ(rand());
		}
		if(seconds<0 && item==0) {
			$(".counter").hide();
			$(".game").hide();
			$(".chkScore").show();
			item = -1;
		}
		    $("#counter").html(seconds);
		    setTimeout("display()",1000);
		}

		function runQ(i) {
			$(document).ready(function(){
					$.ajax({
						url: 'question.json',
						method: 'GET',
						dataType : 'json',
						success: function(response){
							let string = "";
							string += "Question : ";
							string += response[i].question;
							string += "<br>";
							$('.output').html(string);
							$('#choiceA').html(response[i].a);
							$('#choiceB').html(response[i].b);
							$('#choiceC').html(response[i].c);
							$('#choiceD').html(response[i].d);
							string = "";
							ans.push(response[i].ans);
							$('#photo').css('content','url('+response[i].image+')');
						}
					});
				});
		}

		$('.choice').click(function() {
			if (item>0){
				seconds = 10;
		 		runQ(rand());
			} else {
				$(".game").hide();
				$(".chkScore").show();
				$(".photo").hide();
				$(".logo").hide();
				item = -1;
			}
			if($(this).html() ==  ans[ans.length-1]){
				score++;
				console.log(score);
			}
		})

		function checkScore() {
			$('.score').html(score);
			$('.score').show();
			$('.chkScore').hide();
			$(".photo").hide();
			$(".logo").hide();
		}