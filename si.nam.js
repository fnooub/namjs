<script type="text/javascript">
(function($, window, document, undefined) {
    'use strict';

    /**
     * Enable logging in Console
     * @type {Number} 0 : Disable
     *                1 : Error
     *                2 : Info + Error
     */
    var debugLevel = 2;

    /**
    * Những đoạn ghi chú nguồn truyện
    * Toàn bộ nội dung ghi chú, có phân biệt hoa thường
    *
    * @type {Array}
    */
    var citeSources = [
        '最新章节请访问https://m.sinodan.cc',
        'truyện được lấy tại t.r.u.y.ệ.n.y-y',
    ];

    function cleanHtml(str) {
        citeSources.forEach(function(source) {
            if (str.indexOf(source) !== -1) {
                str = str.replace(source, '');
                return false;
            }
        });
        str = str.replace(/[^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+/gm, ''); // eslint-disable-line
        return str;
    }

    function fixText(str) {
        str = str.replaceAll('<em class="n_1"></em>', '男').replaceAll('<em class="n_2"></em>', '人').replaceAll('<em class="n_3"></em>', '啊').replaceAll('<em class="n_4"></em>', '爱').replaceAll('<em class="n_5"></em>', '按').replaceAll('<em class="n_6"></em>', '暴').replaceAll('<em class="n_7"></em>', '臀').replaceAll('<em class="n_8"></em>', '逼').replaceAll('<em class="n_9"></em>', '擦').replaceAll('<em class="n_10"></em>', '潮').replaceAll('<em class="n_11"></em>', '操').replaceAll('<em class="n_12"></em>', '插').replaceAll('<em class="n_13"></em>', '吃').replaceAll('<em class="n_14"></em>', '抽').replaceAll('<em class="n_15"></em>', '处').replaceAll('<em class="n_16"></em>', '床').replaceAll('<em class="n_17"></em>', '春').replaceAll('<em class="n_18"></em>', '唇').replaceAll('<em class="n_19"></em>', '刺').replaceAll('<em class="n_20"></em>', '粗').replaceAll('<em class="n_21"></em>', '大').replaceAll('<em class="n_22"></em>', '洞').replaceAll('<em class="n_23"></em>', '逗').replaceAll('<em class="n_24"></em>', '硬').replaceAll('<em class="n_25"></em>', '儿').replaceAll('<em class="n_26"></em>', '反').replaceAll('<em class="n_27"></em>', '犯').replaceAll('<em class="n_28"></em>', '峰').replaceAll('<em class="n_29"></em>', '妇').replaceAll('<em class="n_30"></em>', '抚').replaceAll('<em class="n_31"></em>', '夫').replaceAll('<em class="n_32"></em>', '腹').replaceAll('<em class="n_33"></em>', '干').replaceAll('<em class="n_34"></em>', '搞').replaceAll('<em class="n_35"></em>', '根').replaceAll('<em class="n_36"></em>', '公').replaceAll('<em class="n_37"></em>', '宫').replaceAll('<em class="n_38"></em>', '勾').replaceAll('<em class="n_39"></em>', '股').replaceAll('<em class="n_40"></em>', '狠').replaceAll('<em class="n_41"></em>', '花').replaceAll('<em class="n_42"></em>', '滑').replaceAll('<em class="n_43"></em>', '坏').replaceAll('<em class="n_44"></em>', '魂').replaceAll('<em class="n_45"></em>', '鸡').replaceAll('<em class="n_46"></em>', '激').replaceAll('<em class="n_47"></em>', '夹').replaceAll('<em class="n_48"></em>', '奸').replaceAll('<em class="n_49"></em>', '交').replaceAll('<em class="n_50"></em>', '叫').replaceAll('<em class="n_51"></em>', '娇').replaceAll('<em class="n_52"></em>', '姐').replaceAll('<em class="n_53"></em>', '禁').replaceAll('<em class="n_54"></em>', '精').replaceAll('<em class="n_55"></em>', '进').replaceAll('<em class="n_56"></em>', '紧').replaceAll('<em class="n_57"></em>', '菊').replaceAll('<em class="n_58"></em>', '渴').replaceAll('<em class="n_59"></em>', '口').replaceAll('<em class="n_60"></em>', '裤').replaceAll('<em class="n_61"></em>', '胯').replaceAll('<em class="n_62"></em>', '快').replaceAll('<em class="n_63"></em>', '浪').replaceAll('<em class="n_64"></em>', '力').replaceAll('<em class="n_65"></em>', '接').replaceAll('<em class="n_66"></em>', '乱').replaceAll('<em class="n_67"></em>', '裸').replaceAll('<em class="n_68"></em>', '妈').replaceAll('<em class="n_69"></em>', '毛').replaceAll('<em class="n_70"></em>', '迷').replaceAll('<em class="n_71"></em>', '靡').replaceAll('<em class="n_72"></em>', '妹').replaceAll('<em class="n_73"></em>', '摸').replaceAll('<em class="n_74"></em>', '嫩').replaceAll('<em class="n_75"></em>', '母').replaceAll('<em class="n_76"></em>', '娘').replaceAll('<em class="n_77"></em>', '尿').replaceAll('<em class="n_78"></em>', '咛').replaceAll('<em class="n_79"></em>', '女').replaceAll('<em class="n_80"></em>', '哦').replaceAll('<em class="n_81"></em>', '趴').replaceAll('<em class="n_82"></em>', '喷').replaceAll('<em class="n_83"></em>', '婆').replaceAll('<em class="n_84"></em>', '屁').replaceAll('<em class="n_85"></em>', '气').replaceAll('<em class="n_86"></em>', '枪').replaceAll('<em class="n_87"></em>', '窃').replaceAll('<em class="n_88"></em>', '骑').replaceAll('<em class="n_89"></em>', '妻').replaceAll('<em class="n_90"></em>', '情').replaceAll('<em class="n_91"></em>', '亲').replaceAll('<em class="n_92"></em>', '裙').replaceAll('<em class="n_93"></em>', '热').replaceAll('<em class="n_94"></em>', '日').replaceAll('<em class="n_95"></em>', '肉').replaceAll('<em class="n_96"></em>', '揉').replaceAll('<em class="n_97"></em>', '乳').replaceAll('<em class="n_98"></em>', '软').replaceAll('<em class="n_99"></em>', '润').replaceAll('<em class="n_100"></em>', '入').replaceAll('<em class="n_101"></em>', '塞').replaceAll('<em class="n_102"></em>', '骚').replaceAll('<em class="n_103"></em>', '色').replaceAll('<em class="n_104"></em>', '上').replaceAll('<em class="n_105"></em>', '舌').replaceAll('<em class="n_106"></em>', '射').replaceAll('<em class="n_107"></em>', '身').replaceAll('<em class="n_108"></em>', '深').replaceAll('<em class="n_109"></em>', '湿').replaceAll('<em class="n_110"></em>', '兽').replaceAll('<em class="n_111"></em>', '受').replaceAll('<em class="n_112"></em>', '舒').replaceAll('<em class="n_113"></em>', '爽').replaceAll('<em class="n_114"></em>', '水').replaceAll('<em class="n_115"></em>', '睡').replaceAll('<em class="n_116"></em>', '酥').replaceAll('<em class="n_117"></em>', '死').replaceAll('<em class="n_118"></em>', '烫').replaceAll('<em class="n_119"></em>', '痛').replaceAll('<em class="n_120"></em>', '舔').replaceAll('<em class="n_121"></em>', '天').replaceAll('<em class="n_122"></em>', '体').replaceAll('<em class="n_123"></em>', '挺').replaceAll('<em class="n_124"></em>', '头').replaceAll('<em class="n_125"></em>', '腿').replaceAll('<em class="n_126"></em>', '脱').replaceAll('<em class="n_127"></em>', '味').replaceAll('<em class="n_128"></em>', '慰').replaceAll('<em class="n_129"></em>', '吻').replaceAll('<em class="n_130"></em>', '握').replaceAll('<em class="n_131"></em>', '喔').replaceAll('<em class="n_132"></em>', '污').replaceAll('<em class="n_133"></em>', '下').replaceAll('<em class="n_134"></em>', '小').replaceAll('<em class="n_135"></em>', '性').replaceAll('<em class="n_136"></em>', '胸').replaceAll('<em class="n_137"></em>', '血').replaceAll('<em class="n_138"></em>', '穴').replaceAll('<em class="n_139"></em>', '阳').replaceAll('<em class="n_140"></em>', '痒').replaceAll('<em class="n_141"></em>', '药').replaceAll('<em class="n_142"></em>', '腰').replaceAll('<em class="n_143"></em>', '夜').replaceAll('<em class="n_144"></em>', '液').replaceAll('<em class="n_145"></em>', '野').replaceAll('<em class="n_146"></em>', '衣').replaceAll('<em class="n_147"></em>', '姨').replaceAll('<em class="n_148"></em>', '吟').replaceAll('<em class="n_149"></em>', '淫').replaceAll('<em class="n_150"></em>', '荫').replaceAll('<em class="n_151"></em>', '幽').replaceAll('<em class="n_152"></em>', '诱').replaceAll('<em class="n_153"></em>', '尤').replaceAll('<em class="n_154"></em>', '欲').replaceAll('<em class="n_155"></em>', '吁').replaceAll('<em class="n_156"></em>', '玉').replaceAll('<em class="n_157"></em>', '吮').replaceAll('<em class="n_158"></em>', '窄').replaceAll('<em class="n_159"></em>', '占').replaceAll('<em class="n_160"></em>', '征').replaceAll('<em class="n_161"></em>', '汁').replaceAll('<em class="n_162"></em>', '嘴').replaceAll('<em class="n_163"></em>', ',').replaceAll('<em class="n_164"></em>', '.').replaceAll('<em class="n_165"></em>', '*').replaceAll('<em class="n_166"></em>', '慾').replaceAll('<em class="n_167"></em>', '丢').replaceAll('<em class="n_168"></em>', '弄');
        return str;
    }

    function html2text(html, noBr = false) {
        html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
        html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
        html = html.replace(/<\/(div|p|li|dd|h[1-6])>/gi, '\n');
        html = html.replace(/<(br|hr)\s*[/]?>/gi, '\n');
        html = html.replace(/<li>/ig, '+ ');
        html = html.replace(/<[^>]+>/g, '');
        html = html.replace(/\n{3,}/g, '\n\n');
        if (noBr) html = html.replace(/\n+/g, ' ');
        return html;
    }

    function downloadFail(err) {
        $downloadStatus('red');
        titleError.push(chapTitle);
        
        txt += LINE + url + LINE;

        if (debugLevel == 2) console.log('%cError: ' + url, 'color:red;');
        if (debugLevel > 0) console.error(err);
    }

    function saveEbook() {
        if (endDownload) return;
        endDownload = true;

        var ebookTitle = $('h1').text().trim(),
            fileName = ebookTitle + '.txt',
            beginEnd = '',
            blob;


        if (titleError.length) {

            titleError = LINE + 'Các chương lỗi: ' + titleError.join(', ') + LINE;
            if (debugLevel > 0) console.warn('Các chương lỗi:', titleError);

        } else {
            titleError = '';
        }

        if (begin !== end) beginEnd = 'Từ [' + begin + '] đến [' + end + ']';

        // data
        txt = ebookTitle.toUpperCase() + LINE2 + beginEnd + LINE + titleError + LINE2 + txt;

        blob = new Blob([txt], {
            encoding: 'UTF-8',
            type: 'text/plain; charset=UTF-8'
        });

        $download.attr({
            href: window.URL.createObjectURL(blob),
            download: fileName
        }).text('Tải xong, click để tải về').off('click');
        $downloadStatus('greenyellow');

        $win.off('beforeunload');

        document.title = '[⇓] ' + ebookTitle;
        if (debugLevel === 2) console.log('%cDownload Finished!', 'color:blue;');
        if (debugLevel > 0) console.timeEnd('TXT Downloader');
    }

    function getContent(pageId) {
        if (endDownload) return;
        chapId = pageId;

        $.get(chapId)
            .done(function (response) {

                var $data = $(response),
                    $chapter = $data.find('.page-content.font-large'),
                    $notContent = $chapter.find('iframe, script, style'),
                    $next,
                    nextUrl;

                if (endDownload) return;

                $next = $data.find('span.curr').next('a');
                if (!$next.length) {
                    $next = $data.find('a.next');
                }

                chapTitle = $data.find('h1').text().trim();

                if (!$chapter.length) {
                    downloadFail('Missing content.');
                } else {
                    $downloadStatus('yellow');

                    if ($notContent.length) $notContent.remove();

                    txt += chapTitle + LINE;
                    //txt += cleanHtml($chapter.html());
                    txt += cleanHtml(html2text(fixText($chapter.html())));
                }

                if (count === 0) begin = chapTitle;
                end = chapTitle;

                count++;

                document.title = '[' + count + '] ' + pageName;

                $download.text('Đang tải chương: ' + count);

                if (debugLevel === 2) console.log('%cComplete: ' + chapId, 'color:green;');

                nextUrl = $next.attr('href');
                if (!nextUrl.length || nextUrl == '#') {
                    saveEbook();
                } else {
                    getContent($next.attr('href'));
                }

            })
            .fail(function (err) {
                chapTitle = null;
                downloadFail(err);
                saveEbook();
            });
    }

    // INDEX
    var pageName = document.title,
        $win = $(window),

        $download = $('<a>', {
            style: 'background-color:lightblue;',
            href: '#download',
            text: 'Tải xuống'
        }),
        $downloadStatus = function(status) {
            $download.css("background-color", "").css("background-color", status);
        },
        endDownload = false,

        LINE = '\n\n',
        LINE2 = '\n\n\n\n',

        txt = '',
        url = '',
        count = 0,
        begin = '',
        end = '',

        chapId = '',
        chapTitle = '',
        chapList = [],
        chapListSize = 0,
        titleError = [];


    $download.insertBefore('h1');

    $download.one('click contextmenu', function (e) {
        e.preventDefault();
        document.title = '[...] Vui lòng chờ trong giây lát';

        var firstChap = location.href;
        console.log(firstChap);
        var startFrom = firstChap;

        if (e.type === 'contextmenu') {
            $download.off('click');
            startFrom = prompt('Nhập ID chương truyện bắt đầu tải:', firstChap) || firstChap;
        } else {
            $download.off('contextmenu');
        }

        if (startFrom.length) {
            getContent(startFrom);

            $win.on('beforeunload', function() {
                return 'Truyện đang được tải xuống...';
            });

            $download.one('click', function(e) {
                e.preventDefault();
                saveEbook();
            });
        }

    });


})(jQuery, window, document);
</script>
