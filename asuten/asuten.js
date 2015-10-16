$(document).ready(function()
{
	$("#asuten_form>input").click(function()
	{
		var text = $("#input").val()
			.replace(/\s/g, '')
			.split("\n");
		var output = "";
		try
		{
			var makeOutput = function(scale, length)
			{
				var l = "";
				if(length != 4)
				{
					l += length;
				}
				return scale + l;
			}
			var error = function(i, j, msg)
			{
				var ii = Number(i)+1;
				var jj = Number(j)+1;
				throw new Error(ii + "行目" + jj + "文字目が不正です。\n" + msg);
			}
			for(var i in text)
			{
				var scale = "";
				var length = 4;
				for(var j in text[i])
				{
					var c = text[i][j];
					
					if(c == "ド")
					{
						output += makeOutput(scale, length);
						scale = "c";
						length = 4;
					}
					else if(c == "レ")
					{
						output += makeOutput(scale, length);
						scale = "d";
						length = 4;
					}
					else if(c == "ミ")
					{
						output += makeOutput(scale, length);
						scale = "e";
						length = 4;
					}
					else if(c == "フ")
					{
						output += makeOutput(scale, length);
						scale = "f";
						length = 4;
					}
					else if(c == "ソ")
					{
						output += makeOutput(scale, length);
						scale = "g";
						length = 4;
					}
					else if(c == "ラ")
					{
						output += makeOutput(scale, length);
						scale = "a";
						length = 4;
					}
					else if(c == "シ")
					{
						output += makeOutput(scale, length);
						scale = "b";
						length = 4;
					}
					else if(c == "・")
					{
						output += makeOutput(scale, length);
						scale = "r";
						length = 4;
					}
					else if(c == "ー")
					{
						if(length == 1)
						{
							error(i, j, "「ー」の数が多すぎます。");
						}
						length /= 2;
					}
					else if(c == "ッ")
					{
						length *= 2;
					}
					else if(c == "ァ")
					{
						if(scale != "f")
						{
							error(i, j, "「ァ」が「フ」の直後以外に存在します。");
						}
					}
					else
					{
						error(i, j, "使用できない文字「" + c + "」があります。");
					}
				}
				output += makeOutput(scale, length);
			}
		}
		catch(e)
		{
			output = e.message;
		}

		$("#output").val(output);
	});
});

